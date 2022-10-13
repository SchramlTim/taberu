<?php

namespace Taberu\Model;

use Taberu\Exception\AlreadyExistException;
use Taberu\Exception\MultipleEntriesFoundException;
use Taberu\Exception\NotFoundException;
use Taberu\Utils\Database;

trait ORMTrait
{
    /**
     * @param array $whereParams
     * @return array
     */
    protected static function fetchDataFromDatabase(array $whereParams): array
    {
        $database = Database::getDB();

        $where = self::prepareWhereConditions($whereParams);

        $sql = 'SELECT ' . implode(',', self::$_loadedFields) . ' FROM ' . self::$_table;

        if (count($where)) {
            $sql .= ' WHERE ' . implode(' AND ', $where);
        }

        $stmt = $database->query($sql);
        return $stmt->fetchAll();
    }

    /**
     * @param array $whereParams
     * @return array[]
     */
    protected static function prepareWhereConditions(array $whereParams): array
    {
        $where = [];

        array_walk($whereParams, function ($v) use (&$where) {
            $where[] = $v[0] . ' ' . $v[1] . ' ' . ((is_string($v[2]) && (strpos($v[2], '(') !== 0 && strpos($v[2], ')') !== strlen($v[2]) - 1)) ? "'$v[2]'" : $v[2]);
        });
        return $where;
    }

    /**
     * @param array|null $valuesToSave
     * @return bool
     */
    public function updateEntity(?array $valuesToSave = null): bool
    {
        $db = Database::getDB();

        array_filter($valuesToSave, function ($value) {
            return !is_null($value) && strlen((string)$value);
        });

        $setQuery = array_map(function ($fieldName) {
            return $fieldName . '=:' . $fieldName;
        }, array_keys($valuesToSave));


        $sql = "UPDATE ".self::getTable()." SET ".implode(', ', $setQuery)." WHERE id=:id";
        $stmt= $db->prepare($sql);

        return $stmt->execute(array_merge([self::ID => $this->getId()], $valuesToSave));
    }

    /**
     * @param array|null $valuesToSave
     * @return bool
     */
    public function createEntity(?array $valuesToSave = null): bool
    {
        $db = Database::getDB();

        array_filter($valuesToSave, function ($value) {
            return !is_null($value) && strlen((string)$value);
        });

        $setQuery = array_map(function ($fieldName) {
            return ':' . $fieldName;
        }, array_keys($valuesToSave));

        $sql = "INSERT INTO " . self::getTable() . " (".implode(', ', array_keys($valuesToSave)).") VALUES (".implode(', ', $setQuery).")";

        $stmt= $db->prepare($sql);

        $executed = false;
        try {
            $executed = $stmt->execute($valuesToSave);
        } catch (\PDOException $exception) {
            //duplicate entry
            if ((int)$exception->getCode() === 23505) {
                throw new AlreadyExistException('Already exist');
            }

            throw $exception;
        }

        $this->setId($db->lastInsertId());

        return $executed;
    }

    /**
     * @param array $whereParams
     * @return static
     */
    public static function findFirstOrFail(array $whereParams = []): self
    {
        $firstEntry = self::fetchDataFromDatabase($whereParams);

        if (!$firstEntry) {
            throw new NotFoundException('Entry not found');
        }

        if (is_array($firstEntry) && count($firstEntry) > 1) {
            throw new MultipleEntriesFoundException('Mutiple entries are found');
        }

        return self::createObjectFromDatabase($firstEntry[0]);
    }

    /**
     * @param array $whereParams
     * @return array
     */
    public static function all(array $whereParams = []): array
    {
        $allEntries = self::fetchDataFromDatabase($whereParams);

        if (!$allEntries) {
            throw new NotFoundException('There are no entries');
        }

        $entries = [];

        foreach ($allEntries as $entry) {
            $entries[] = self::createObjectFromDatabase($entry);
        }

        return $entries;
    }

    /**
     * @param array $whereParams
     * @return array
     */
    public static function delete(array $whereParams = []): void
    {
        $database = Database::getDB();

        $where = self::prepareWhereConditions($whereParams);

        $sql = 'DELETE FROM ' . self::$_table;

        if (count($where)) {
            $sql .= ' WHERE ' . implode(' AND ', $where);
        }



        $stmt = $database->query($sql);
        $success = $stmt->execute();

        if (!$success) {
            throw new NotFoundException('There are no entries');
        }
    }

}