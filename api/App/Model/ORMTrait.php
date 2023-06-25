<?php

namespace Taberu\Model;

use Taberu\Exception\AlreadyExistException;
use Taberu\Exception\MultipleEntriesFoundException;
use Taberu\Exception\NotFoundException;
use Taberu\Utils\Database;

trait ORMTrait
{

    protected static function extractTables(array $whereParams) {
        $tables = array_map(function ($v) {
            return strpos($v[0], '.') !== false ? strtok($v[0], '.') : null; 
        }, $whereParams);
        return array_unique(array_filter($tables, fn($v) => (bool) $v));
    }

    /**
     * @param array $whereParams
     * @return array
     */
    protected static function fetchDataFromDatabase(array $whereParams): array
    {
        $database = Database::getDB();

        $where = self::prepareWhereConditions($whereParams);
        $tables = self::extractTables($whereParams);
        $fields = array_map(fn($field) => $field . ' as "' . $field . '"', self::$_loadedFields);  

        $sql = 'SELECT ' . implode(',', $fields) . ' FROM ' . (count($tables) ? implode(',', $tables) : self::$_table);

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

        $mapping = [];
        foreach ($valuesToSave as $key => $value) {
            $name = explode('.', $key)[1];
            $mapping[$name] = $value;
        }

        $setQuery = array_map(function ($fieldName) {
            return $fieldName . '=:' . $fieldName;
        }, array_keys($mapping));

        $sql = "UPDATE ".self::getTable()." SET ".implode(', ', $setQuery)." WHERE id=:id";

        $stmt= $db->prepare($sql);

        error_log($sql);

        return $stmt->execute(array_merge(['id' => $this->getId()], $mapping));
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

        $mapping = [];
        foreach ($valuesToSave as $key => $value) {
            $name = explode('.', $key)[1];
            $mapping[$name] = $value;
        }

        $setQuery = array_map(function ($fieldName) {
            return ':' . $fieldName;
        }, array_keys($mapping));

        $sql = "INSERT INTO " . self::getTable() . " (".implode(', ', array_keys($mapping)).") VALUES (".implode(', ', $setQuery).")";
        $stmt= $db->prepare($sql);

        $executed = false;
        try {
            $executed = $stmt->execute($mapping);
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
