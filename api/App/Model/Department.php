<?php

namespace Taberu\Model;

use LogicException;
use RuntimeException;
use Taberu\Exception\MultipleEntriesFoundException;
use Taberu\Exception\NotFoundException;
use Taberu\Utils\Database;

class Department extends BaseModel
{
    use ORMTrait;

    const NAME = 'name';
    const DESCRIPTION = 'description';
    const LOCATION = 'location';

    private static array $_loadedFields = [
        self::ID,
        self::NAME,
        self::DESCRIPTION,
        self::LOCATION,
    ];

    public static string $_table = 'departments';

    private string $name = '';
    private string $description = '';
    private string $location = '';

    /**
     * Department constructor.
     */
    public function __construct()
    {
        $this->table = self::$_table;
    }

    /**
     * @param array $data
     * @return static
     */
    protected static function createObjectFromDatabase(array $data): self
    {
        $object = new self();
        $object->setId($data[self::ID])
            ->setName($data[self::NAME])
            ->setDescription($data[self::DESCRIPTION])
            ->setLocation($data[self::LOCATION]);

        return $object;
    }

    /**
     * @param array|null $valuesToSave
     * @return bool
     */
    public function update(?array $valuesToSave = null): bool
    {
        if (!$valuesToSave) {
            $valuesToSave = [
                self::NAME => $this->getName(),
                self::DESCRIPTION => $this->getDescription(),
                self::LOCATION => $this->getLocation(),
            ];
        }

        return self::updateEntity($valuesToSave);
    }

    /**
     * @param array|null $valuesToSave
     * @return bool
     */
    public function create(?array $valuesToSave = null): bool
    {
        if (!$valuesToSave) {
            $valuesToSave = [
                self::NAME => $this->getName(),
                self::DESCRIPTION => $this->getDescription(),
                self::LOCATION => $this->getLocation(),
            ];
        }

        return self::createEntity($valuesToSave);
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription(string $description): self
    {
        $this->description = $description;
        return $this;
    }

    /**
     * @return string
     */
    public function getLocation(): string
    {
        return $this->location;
    }

    /**
     * @param string $location
     */
    public function setLocation(string $location): self
    {
        $this->location = $location;
        return $this;
    }

    /**
     * @return string
     */
    public static function getTable(): string
    {
        return self::$_table;
    }

    /**
     * @return string
     */
    public function getLink(): string
    {
        return 'https://' . $_SERVER['HTTP_HOST'] . '/v1/departments/' . $this->getId();
    }
}
