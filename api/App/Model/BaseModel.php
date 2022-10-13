<?php

namespace Taberu\Model;

use RuntimeException;
use Taberu\Exception\AlreadyExistException;
use Taberu\Exception\MultipleEntriesFoundException;
use Taberu\Exception\NotFoundException;
use Taberu\Utils\Database;

abstract class BaseModel
{
    const ID = 'id';

    protected ?int $id = null;
    protected ?string $table = null;

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
    abstract public static function getTable(): string;

    /**
     * @return string
     */
    abstract public function getLink(): string;
}
