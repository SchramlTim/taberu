<?php

namespace Taberu\Model;

use Taberu\Utils\Database;

abstract class BaseModel 
{
    const ID = 'id';

    protected ?int $id = null;
    protected ?string $table = null;

    public function save(?array $valuesToSave = null): bool
    {
        $db = Database::getDB();

        array_filter($valuesToSave, function($value) {
            return !is_null($value) && strlen((string)$value);
        });

        $setQuery = array_map(function ($fieldName) {
            return $fieldName . '=:' . $fieldName;
        }, array_keys($valuesToSave));


        $sql = "UPDATE ".$this->getTable()." SET ".implode(', ', $setQuery)." WHERE id=:id";
        $stmt= $db->prepare($sql);
        
        return $stmt->execute(array_merge([self::ID => $this->getId()], $valuesToSave));
    }


    protected function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getTable(): string
    {
        return $this->table;
    }

    abstract public static function findFirstOrFail(array $whereParams);

    abstract public function getLink();
}