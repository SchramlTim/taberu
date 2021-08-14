<?php

namespace Taberu\Model;

use LogicException;
use RuntimeException;
use Taberu\Exception\MutipleEntriesFoundException;
use Taberu\Exception\NotFoundException;
use Taberu\Utils\Database;

class MenuItem extends BaseModel
{
    use ORMTrait;

    const NAME = 'name';
    const MENU_ID = 'menu_id';
    const DESCRIPTION = 'description';
    const PRICE = 'price';

    private static array $_loadedFields = [
        self::ID,
        self::NAME,
        self::MENU_ID,
        self::DESCRIPTION,
        self::PRICE,
    ];

    public static string $_table = 'menu_items';

    private int $menuId = 0;
    private string $name = '';
    private string $description = '';
    private float $price = 0.0;

    /**
     * MenuItem constructor.
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
            ->setMenuId($data[self::MENU_ID])
            ->setDescription($data[self::DESCRIPTION])
            ->setPrice($data[self::PRICE]);

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
                self::MENU_ID => $this->getMenuId(),
                self::DESCRIPTION => $this->getDescription(),
                self::PRICE => $this->getPrice(),
            ];
        }

        return parent::update($valuesToSave);
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
                self::MENU_ID => $this->getMenuId(),
                self::DESCRIPTION => $this->getDescription(),
                self::PRICE => $this->getPrice(),
            ];
        }

        return parent::create($valuesToSave);
    }

    /**
     * @return int
     */
    public function getMenuId(): int
    {
        return $this->menuId;
    }

    /**
     * @param int $menuId
     * @return $this
     */
    public function setMenuId(int $menuId): self
    {
        $this->menuId = $menuId;
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
     * @return $this
     */
    public function setDescription(string $description): self
    {
        $this->description = $description;
        return $this;
    }

    /**
     * @return float
     */
    public function getPrice(): float
    {
        return $this->price;
    }

    /**
     * @param float $price
     * @return $this
     */
    public function setPrice(float $price): self
    {
        $this->price = $price;
        return $this;
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
