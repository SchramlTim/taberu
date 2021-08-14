<?php

namespace Taberu\Model;

use LogicException;
use RuntimeException;
use Taberu\Exception\MutipleEntriesFoundException;
use Taberu\Exception\NotFoundException;
use Taberu\Utils\Database;

class Menu extends BaseModel
{
    use ORMTrait;

    const NAME = 'name';
    const DESCRIPTION = 'description';
    const CREATOR_ID = 'creator_id';
    const RESTAURANT_ID = 'restaurant_id';

    private static array $_loadedFields = [
        self::ID,
        self::NAME,
        self::DESCRIPTION,
        self::CREATOR_ID,
        self::RESTAURANT_ID,
    ];

    public static string $_table = 'menus';

    private string $name = '';
    private string $description = '';
    private int $creatorId = 0;
    private int $restaurantId = 0;

    /**
     * Menu constructor.
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
            ->setCreatorId($data[self::CREATOR_ID])
            ->setRestaurantId($data[self::RESTAURANT_ID]);

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
                self::CREATOR_ID => $this->getCreatorId(),
                self::RESTAURANT_ID => $this->getRestaurantId(),
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
                self::DESCRIPTION => $this->getDescription(),
                self::CREATOR_ID => $this->getCreatorId(),
                self::RESTAURANT_ID => $this->getRestaurantId(),
            ];
        }

        return parent::create($valuesToSave);
    }

    /**
     * @return int
     */
    public function getCreatorId(): int
    {
        return $this->creatorId;
    }

    /**
     * @param int $creatorId
     * @return $this
     */
    public function setCreatorId(int $creatorId): self
    {
        $this->creatorId = $creatorId;
        return $this;
    }

    /**
     * @return int
     */
    public function getRestaurantId(): int
    {
        return $this->restaurantId;
    }

    /**
     * @param int $restaurantId
     * @return $this
     */
    public function setRestaurantId(int $restaurantId): self
    {
        $this->restaurantId = $restaurantId;
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

    public function getMenuItems($whereParams = []): array
    {
        $items = MenuItem::all([
            [MenuItem::MENU_ID, '=', $this->getId()],
        ]);

        return $items;
    }

    /**
     * @return string
     */
    public function getLink(): string
    {
        return $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . '/v1/menus/' . $this->getId();
    }
}
