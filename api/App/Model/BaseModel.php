<?php

namespace Taberu\Model;

use RuntimeException;
use Taberu\Exception\AlreadyExistException;
use Taberu\Exception\MutipleEntriesFoundException;
use Taberu\Exception\NotFoundException;
use Taberu\Utils\Database;

abstract class BaseModel
{
    const ID = 'id';

    protected ?int $id = null;
    protected ?string $table = null;

    /**
     * @param array|null $valuesToSave
     * @return bool
     */
    public function update(?array $valuesToSave = null): bool
    {
        $db = Database::getDB();

        array_filter($valuesToSave, function ($value) {
            return !is_null($value) && strlen((string)$value);
        });

        $setQuery = array_map(function ($fieldName) {
            return $fieldName . '=:' . $fieldName;
        }, array_keys($valuesToSave));


        $sql = "UPDATE ".$this->getTable()." SET ".implode(', ', $setQuery)." WHERE id=:id";
        $stmt= $db->prepare($sql);
        
        return $stmt->execute(array_merge([self::ID => $this->getId()], $valuesToSave));
    }

    /**
     * @param array|null $valuesToSave
     * @return bool
     */
    public function create(?array $valuesToSave = null): bool
    {
        $db = Database::getDB();

        array_filter($valuesToSave, function ($value) {
            return !is_null($value) && strlen((string)$value);
        });

        $setQuery = array_map(function ($fieldName) {
            return ':' . $fieldName;
        }, array_keys($valuesToSave));

        $sql = "INSERT INTO " . $this->getTable() . " (".implode(', ', array_keys($valuesToSave)).") VALUES (".implode(', ', $setQuery).")";

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
            throw new MutipleEntriesFoundException('Mutiple entries are found');
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
            $entries[] = self::fetchDataFromDatabase($entry);
        }

        return $entries;
    }

    /**
     * @param array $whereParams
     * @return array
     */
    protected static function fetchDataFromDatabase(array $whereParams): array
    {
        $database = Database::getDB();

        $where = [];

        array_walk($whereParams, function ($v) use (&$where) {
            $where[] = $v[0] . ' ' . $v[1] . ' ' . (is_string($v[2]) ? "'$v[2]'" : $v[2]);
        });

        $sql = 'SELECT ' . implode(',', self::$_loadedFields) . ' FROM ' . self::$_table;

        if (count($where)) {
            $sql .= ' WHERE ' . implode(' AND ', $where);
        }

        $stmt = $database->query($sql);
        return $stmt->fetchAll();
    }

    /**
     * @param array $data
     * @return static|null
     */
    protected static function createObjectFromDatabase(array $data): ?self
    {
        return null;
    }

    /**
     * @param int $id
     * @return $this
     */
    protected function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getTable(): string
    {
        return $this->table;
    }

    /**
     * @return string
     */
    abstract public function getLink(): string;
}
