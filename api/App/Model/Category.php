<?php

namespace Taberu\Model;

use LogicException;
use RuntimeException;
use Taberu\Exception\MultipleEntriesFoundException;
use Taberu\Exception\NotFoundException;
use Taberu\Utils\Database;

class Category extends BaseModel
{
    use ORMTrait;

    const ID = 'categories.id';
    const NAME = 'categories.name';
    const ICON_URL = 'categories.icon_url';

    private static array $_loadedFields = [
        self::ID,
        self::NAME,
        self::ICON_URL
    ];

    public static string $_table = 'categories';

    private string $name = '';
    private string $url = '';

    /**
     * Category constructor.
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
            ->setIconUrl($data[self::ICON_URL]);

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
                self::NAME => $this->getName()
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
                self::NAME => $this->getName()
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
     * @return $this
     */
    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return string
     */
    public function getIconUrl(): string
    {
        return $this->url;
    }

    /**
     * @param string $url
     * @return $this
     */
    public function setIconUrl(string $url): self
    {
        $this->url = $url;
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
        return 'https://' . $_SERVER['HTTP_HOST'] . '/v1/categories/' . $this->getId();
    }
}
