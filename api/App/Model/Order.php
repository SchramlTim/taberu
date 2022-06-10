<?php

namespace Taberu\Model;

use LogicException;
use RuntimeException;
use Taberu\Exception\MutipleEntriesFoundException;
use Taberu\Exception\NotFoundException;
use Taberu\Utils\Database;

class Order extends BaseModel
{
    use ORMTrait;

    const BOWL_ID = 'bowl_id';
    const USER_ID = 'user_id';
    const FINAL_PRICE = 'final_price';
    const PAYMENT_METHOD = 'payment_method';
    const PAYMENT_STATUS = 'payment_status';
    const ORDER_STATUS = 'order_status';

    private static array $_loadedFields = [
        self::ID,
        self::BOWL_ID,
        self::USER_ID,
        self::FINAL_PRICE,
        self::PAYMENT_METHOD,
        self::PAYMENT_STATUS,
        self::ORDER_STATUS,
    ];

    public static string $_table = 'orders';

    private int $bowlId;
    private int $userId;
    private float $finalPrice;
    private string $paymentMethod = '';
    private string $paymentStatus = 'NOT_PAID';
    private string $orderStatus = 'OPEN';

    /**
     * Order constructor.
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
            ->setBowlId($data[self::BOWL_ID])
            ->setUserId($data[self::USER_ID])
            ->setFinalPrice($data[self::FINAL_PRICE])
            ->setPaymentMethod($data[self::PAYMENT_METHOD])
            ->setPaymentStatus($data[self::PAYMENT_STATUS])
            ->setOrderStatus($data[self::ORDER_STATUS]);

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
                self::FINAL_PRICE => $this->getFinalPrice(),
                self::PAYMENT_METHOD => $this->getPaymentMethod(),
                self::PAYMENT_STATUS => $this->getPaymentStatus(),
                self::ORDER_STATUS => $this->getOrderStatus(),
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
                self::BOWL_ID => $this->getBowlId(),
                self::USER_ID => $this->getUserId(),
                self::FINAL_PRICE => $this->getFinalPrice(),
                self::PAYMENT_METHOD => $this->getPaymentMethod(),
                self::PAYMENT_STATUS => $this->getPaymentStatus(),
                self::ORDER_STATUS => $this->getOrderStatus(),
            ];
        }

        return self::createEntity($valuesToSave);
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
     * @return float
     */
    public function getFinalPrice(): float
    {
        return $this->finalPrice;
    }

    /**
     * @param float $finalPrice
     * @return $this
     */
    public function setFinalPrice(float $finalPrice): self
    {
        $this->finalPrice = $finalPrice;
        return $this;
    }

    /**
     * @return string
     */
    public function getPaymentMethod(): string
    {
        return $this->paymentMethod;
    }

    /**
     * @param string $paymentMethod
     * @return $this
     */
    public function setPaymentMethod(string $paymentMethod): self
    {
        $this->paymentMethod = $paymentMethod;
        return $this;
    }

    /**
     * @return string
     */
    public function getPaymentStatus(): string
    {
        return $this->paymentStatus;
    }

    /**
     * @param string $paymentStatus
     * @return $this
     */
    public function setPaymentStatus(string $paymentStatus): self
    {
        $this->paymentStatus = $paymentStatus;
        return $this;
    }

    /**
     * @return string
     */
    public function getOrderStatus(): string
    {
        return $this->orderStatus;
    }

    /**
     * @param string $orderStatus
     * @return $this
     */
    public function setOrderStatus(string $orderStatus): self
    {
        $this->orderStatus = $orderStatus;
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
        return 'https://' . $_SERVER['HTTP_HOST'] . '/v1/orders/' . $this->getId();
    }
}
