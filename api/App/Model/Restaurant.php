<?php

namespace Taberu\Model;

use LogicException;
use RuntimeException;
use Taberu\Exception\MutipleEntriesFoundException;
use Taberu\Exception\NotFoundException;
use Taberu\Utils\Database;

class Restaurant extends BaseModel
{
    use ORMTrait;

    const NAME = 'name';
    const STREET = 'street';
    const STREET_NUMBER = 'street_nr';
    const ZIP = 'zip';
    const CITY = 'city';
    const DESCRIPTION = 'description';
    const PHONE_NUMBER = 'phone_number';

    protected static array $_loadedFields = [
        self::ID,
        self::NAME,
        self::STREET,
        self::STREET_NUMBER,
        self::ZIP,
        self::CITY,
        self::DESCRIPTION,
        self::PHONE_NUMBER,
    ];

    public static string $_table = 'restaurants';

    private string $name = '';
    private string $street = '';
    private string $streetNumber = '';
    private string $zip = '';
    private string $city = '';
    private string $description = '';
    private string $phoneNumber = '';

    /**
     * Restaurant constructor.
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
            ->setStreet($data[self::STREET] ?? '')
            ->setStreetNumber($data[self::STREET_NUMBER] ?? '')
            ->setZip($data[self::ZIP] ?? '')
            ->setCity($data[self::CITY] ?? '')
            ->setDescription($data[self::DESCRIPTION] ?? '')
            ->setPhoneNumber($data[self::PHONE_NUMBER] ?? '');

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
                self::STREET => $this->getStreet(),
                self::STREET_NUMBER => $this->getStreetNumber(),
                self::ZIP => $this->getZip(),
                self::CITY => $this->getCity(),
                self::DESCRIPTION => $this->getDescription(),
                self::PHONE_NUMBER => $this->getPhoneNumber(),
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
                self::STREET => $this->getStreet(),
                self::STREET_NUMBER => $this->getStreetNumber(),
                self::ZIP => $this->getZip(),
                self::CITY => $this->getCity(),
                self::DESCRIPTION => $this->getDescription(),
                self::PHONE_NUMBER => $this->getPhoneNumber()
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
    public function getStreet(): string
    {
        return $this->street;
    }

    /**
     * @param string $street
     * @return $this
     */
    public function setStreet(string $street): self
    {
        $this->street = $street;
        return $this;
    }

    /**
     * @return string
     */
    public function getStreetNumber(): string
    {
        return $this->streetNumber;
    }

    /**
     * @param string $streetNumber
     * @return $this
     */
    public function setStreetNumber(string $streetNumber): self
    {
        $this->streetNumber = $streetNumber;
        return $this;
    }

    /**
     * @return string
     */
    public function getZip(): string
    {
        return $this->zip;
    }

    /**
     * @param string $zip
     * @return $this
     */
    public function setZip(string $zip): self
    {
        $this->zip = $zip;
        return $this;
    }

    /**
     * @return string
     */
    public function getCity(): string
    {
        return $this->city;
    }

    /**
     * @param string $city
     * @return $this
     */
    public function setCity(string $city): self
    {
        $this->city = $city;
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
    public function getPhoneNumber(): string
    {
        return $this->phoneNumber;
    }

    /**
     * @param string $phoneNumber
     * @return $this
     */
    public function setPhoneNumber(string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;
        return $this;
    }

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
        return $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . '/v1/restaurants/' . $this->getId();
    }
}
