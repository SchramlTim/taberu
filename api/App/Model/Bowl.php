<?php

namespace Taberu\Model;

use LogicException;
use RuntimeException;
use Taberu\Exception\AlreadyExistException;
use Taberu\Exception\MutipleEntriesFoundException;
use Taberu\Exception\NotFoundException;
use Taberu\Utils\Database;
use \DateTime;

class Bowl extends BaseModel
{
    use ORMTrait;

    const CREATOR_ID = 'creator_id';
    const NAME = 'name';
    const DESCRIPTION = 'description';
    const ORDER_DEADLINE = 'order_deadline';
    const ARRIVE_DATE = 'arrive_date';
    const MENU_ID = 'menu_id';

    private static array $_loadedFields = [
        self::ID,
        self::CREATOR_ID,
        self::NAME,
        self::DESCRIPTION,
        self::ORDER_DEADLINE,
        self::ARRIVE_DATE,
        self::MENU_ID,
    ];

    public static string $_table = 'bowls';

    private int $creatorID;
    private string $name = '';
    private string $description = '';
    private DateTime $orderDeadline;
    private DateTime $arriveDate;
    private int $menuId;


    /**
     * Bowl constructor.
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
            ->setCreatorID($data[self::CREATOR_ID])
            ->setName($data[self::NAME])
            ->setDescription($data[self::DESCRIPTION])
            ->setOrderDeadline(new DateTime($data[self::ORDER_DEADLINE]))
            ->setArriveDate(new DateTime($data[self::ARRIVE_DATE]))
            ->setMenuId($data[self::MENU_ID]);

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
                self::CREATOR_ID => $this->getCreatorID(),
                self::NAME => $this->getName(),
                self::DESCRIPTION => $this->getDescription(),
                self::ORDER_DEADLINE => $this->getOrderDeadline(),
                self::ARRIVE_DATE => $this->getArriveDate(),
                self::MENU_ID => $this->getMenuId(),
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
                self::CREATOR_ID => $this->getCreatorID(),
                self::NAME => $this->getName(),
                self::DESCRIPTION => $this->getDescription(),
                self::ORDER_DEADLINE => $this->getOrderDeadline(),
                self::ARRIVE_DATE => $this->getArriveDate(),
                self::MENU_ID => $this->getMenuId(),
            ];
        }

        return self::createEntity($valuesToSave);
    }

    /**
     * @return int
     */
    public function getCreatorID(): int
    {
        return $this->creatorID;
    }

    /**
     * @param int $creatorID
     * @return $this
     */
    public function setCreatorID(int $creatorID): self
    {
        $this->creatorID = $creatorID;
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
     * @return DateTime
     */
    public function getOrderDeadline(): DateTime
    {
        return $this->orderDeadline;
    }

    /**
     * @param DateTime $orderDeadline
     * @return $this
     */
    public function setOrderDeadline(DateTime $orderDeadline): self
    {
        $this->orderDeadline = $orderDeadline;
        return $this;
    }

    /**
     * @return DateTime
     */
    public function getArriveDate(): DateTime
    {
        return $this->arriveDate;
    }

    /**
     * @param DateTime $arriveDate
     * @return $this
     */
    public function setArriveDate(DateTime $arriveDate): self
    {
        $this->arriveDate = $arriveDate;
        return $this;
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

    public function getOrders(): array
    {
        $orders = Order::all([
            [Bowl::ID, '=', $this->getId()],
        ]);

        return $orders;
    }

    public function addUser(User $user): void
    {
        $user2bowl = new User2Bowl();
        $user2bowl->setUserId($user->getId())
            ->setBowlId($this->getId());
        $user2bowl->create();
    }

    public function getUsers($whereParams = []): array
    {
        $userMapping = User2Bowl::all(array_merge([
            [User2Bowl::BOWL_ID, '=', $this->getId()],
        ], $whereParams));

        $userIds = [];
        array_map(function(User2Bowl $user2bowl) use (&$userIds) {
            $userIds[] = $user2bowl->getUserId();
        }, $userMapping);

        $users = User::all([
            [User::ID, 'IN', '('.implode(',', $userIds).')'],
        ]);

        return $users;
    }

    /**
     * @return string
     */
    public function getOrderLink(): string
    {
        return $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . '/v1/bowls/' . $this->getId() . '/orders';
    }

    /**
     * @return string
     */
    public function getUsersLink(): string
    {
        return $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . '/v1/bowls/' . $this->getId() . '/users';
    }

    /**
     * @return array
     */
    public static function getLoadedFields(): array
    {
        return self::$_loadedFields;
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
        return $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . '/v1/bowls/' . $this->getId();
    }
}
