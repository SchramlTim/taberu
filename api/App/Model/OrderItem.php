<?php

namespace Taberu\Model;

class OrderItem extends BaseModel
{
    use ORMTrait;

    const ID = 'order_items.id';
    const ORDER_ID = 'order_items.order_id';
    const NAME = 'order_items.name';
    const PRICE = 'order_items.price';
    const COUNT = 'order_items.count';
    const ADDITIONAL_INFORMATION = 'order_items.additional_information';

    private static array $_loadedFields = [
        self::ID,
        self::ORDER_ID,
        self::NAME,
        self::PRICE,
        self::COUNT,
        self::ADDITIONAL_INFORMATION,
    ];

    public static string $_table = 'order_items';

    private int $orderId;
    private string $name = '';
    private float $price;
    private int $count;
    private string $additionalInformation = '';

    /**
     * OrderItem constructor.
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
            ->setOrderId($data[self::ORDER_ID])
            ->setName($data[self::NAME])
            ->setPrice($data[self::PRICE])
            ->setCount($data[self::COUNT])
            ->setAdditionalInformation($data[self::ADDITIONAL_INFORMATION]);

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
                self::ORDER_ID => $this->getOrderId(),
                self::NAME => $this->getName(),
                self::PRICE => $this->getPrice(),
                self::COUNT => $this->getCount(),
                self::ADDITIONAL_INFORMATION => $this->getAdditionalInformation(),
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
                self::ORDER_ID => $this->getOrderId(),
                self::NAME => $this->getName(),
                self::PRICE => $this->getPrice(),
                self::COUNT => $this->getCount(),
                self::ADDITIONAL_INFORMATION => $this->getAdditionalInformation(),
            ];
        }

        return self::createEntity($valuesToSave);
    }

    /**
     * @return int
     */
    public function getOrderId(): int
    {
        return $this->orderId;
    }

    /**
     * @param int $orderId
     */
    public function setOrderId(int $orderId): self
    {
        $this->orderId = $orderId;
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
     */
    public function setName(string $name): self
    {
        $this->name = $name;
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
     */
    public function setPrice(float $price): self
    {
        $this->price = $price;
        return $this;
    }

    /**
     * @return int
     */
    public function getCount(): int
    {
        return $this->count;
    }

    /**
     * @param int $count
     */
    public function setCount(int $count): self
    {
        $this->count = $count;
        return $this;
    }

    /**
     * @return string
     */
    public function getAdditionalInformation(): string
    {
        return $this->additionalInformation;
    }

    /**
     * @param string $additionalInformation
     */
    public function setAdditionalInformation(string $additionalInformation): self
    {
        $this->additionalInformation = $additionalInformation;
        return $this;
    }

    /**
     * @return int
     */
    public function getTotalSum(): int
    {
        return ($this->price * $this->count);
    }

    /**
     * @return string
     */
    public static function getTable(): string
    {
        return self::$_table;
    }

    public function getLink(): string
    {
        return '';
    }
}
