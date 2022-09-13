<?php

namespace Taberu\Model;

use LogicException;
use RuntimeException;
use Taberu\Exception\MutipleEntriesFoundException;
use Taberu\Exception\NotFoundException;
use Taberu\Utils\Database;

class Menu2Category extends BaseModel
{
    use ORMTrait;

    const MENU_ID = 'menu_id';
    const CATEGORY_ID = 'category_id';

    private static array $_loadedFields = [
        self::ID,
        self::MENU_ID,
        self::CATEGORY_ID
    ];

    public static string $_table = 'menu2category';

    private int $menuId;
    private int $categoryId;

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
        $object->setMenuId($data[self::MENU_ID])
            ->setCategoryId($data[self::CATEGORY_ID]);

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
                self::MENU_ID => $this->getMenuId(),
                self::CATEGORY_ID => $this->getCategoryId(),
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
                self::MENU_ID => $this->getMenuId(),
                self::CATEGORY_ID => $this->getCategoryId(),
            ];
        }

        return self::createEntity($valuesToSave);
    }

    /**
     * @return int
     */
    public function getMenuId(): int
    {
        return $this->menuId;
    }

    /**
     * @param int $bowlId
     * @return $this
     */
    public function setMenuId(int $menuId): self
    {
        $this->menuId = $menuId;
        return $this;
    }

    /**
     * @return int
     */
    public function getCategoryId(): int
    {
        return $this->categoryId;
    }

    /**
     * @param int $userId
     * @return $this
     */
    public function setCategoryId(int $categoryId): self
    {
        $this->categoryId = $categoryId;
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
        return '';
    }
}
