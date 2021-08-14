<?php

namespace Taberu\Model;

use LogicException;
use RuntimeException;
use Taberu\Exception\MutipleEntriesFoundException;
use Taberu\Exception\NotFoundException;
use Taberu\Utils\Database;

class User2Bowl extends BaseModel
{
    use ORMTrait;

    const BOWL_ID = 'bowl_id';
    const USER_ID = 'user_id';

    private static array $_loadedFields = [
        self::ID,
        self::BOWL_ID,
        self::USER_ID
    ];

    public static string $_table = 'user2bowl';

    private int $bowlId;
    private int $userId;

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
        $object->setUserId($data[self::USER_ID])
            ->setBowlId($data[self::BOWL_ID]);

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
                self::BOWL_ID => $this->getBowlId(),
                self::USER_ID => $this->getUserId(),
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
                self::BOWL_ID => $this->getBowlId(),
                self::USER_ID => $this->getUserId(),
            ];
        }

        return parent::create($valuesToSave);
    }

    /**
     * @return int
     */
    public function getBowlId(): int
    {
        return $this->bowlId;
    }

    /**
     * @param int $bowlId
     * @return $this
     */
    public function setBowlId(int $bowlId): self
    {
        $this->bowlId = $bowlId;
        return $this;
    }

    /**
     * @return int
     */
    public function getUserId(): int
    {
        return $this->userId;
    }

    /**
     * @param int $userId
     * @return $this
     */
    public function setUserId(int $userId): self
    {
        $this->userId = $userId;
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
