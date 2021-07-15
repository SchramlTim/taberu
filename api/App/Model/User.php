<?php

namespace Taberu\Model;

use LogicException;
use RuntimeException;
use Taberu\Utils\Database;

class User extends BaseModel
{
    const USERNAME = 'username';
    const FIRST_NAME = 'first_name';
    const LAST_NAME = 'last_name';
    const PHONE_NUMBER = 'phone_number';
    const PAYPAL_USERNAME = 'paypal_username';

    private static array $_loadedFields = [
        self::ID,
        self::USERNAME,
        self::FIRST_NAME,
        self::LAST_NAME,
        self::PHONE_NUMBER,
        self::PAYPAL_USERNAME,
    ];

    protected static string $_table = 'users';

    private string $username = '';
    private string $firstName = '';
    private string $lastName = '';
    private string $phoneNumber = '';
    private string $paypalUsername = '';

    public function __construct()
    {
        $this->table = self::$_table;
    }

    public static function findFirstOrFail(array $whereParams = [])
    {
        $userInformations = self::fetchDataFromDatabase($whereParams);
    
        if (!$userInformations) {
            throw new RuntimeException('User not found');
        }

        if (is_array($userInformations) && count($userInformations) > 1) {
            throw new LogicException('Mutiple users are found');
        }

        return self::createUserObjectFromDatabase($userInformations[0]);
    }


    public static function all(array $whereParams = []): array
    {
        $allUsers = self::fetchDataFromDatabase($whereParams);
    
        if (!$allUsers) {
            throw new RuntimeException('There are no users');
        }

        $users = [];

        foreach ($allUsers as $userData) {
            $users[] = self::createUserObjectFromDatabase($userData);
        }

         return $users;
    }

    protected static function fetchDataFromDatabase(array $whereParams)
    {
        $database = Database::getDB();

        $where = [];

        array_walk($whereParams, function ($v) use (&$where) {
            $where[] = $v[0] . ' ' . $v[1] . ' ' . (is_string($v[2]) ? "'$v[2]'" : $v[2]);
        });

        $sql = 'SELECT ' . implode(',', self::$_loadedFields) . ' FROM ' . self::$_table;

        if (count($where)) {
            $sql .= ' WHERE ' . implode(' AND ', $where);
        }

        $stmt = $database->query($sql);
        return $stmt->fetchAll();
    }

    protected static function createUserObjectFromDatabase(array $userInformations)
    {
        $user = new self();
        $user->setId($userInformations[self::ID])
            ->setUsername($userInformations[self::USERNAME] ?? '')
            ->setFirstName($userInformations[self::FIRST_NAME] ?? '')
            ->setLastName($userInformations[self::LAST_NAME] ?? '')
            ->setPhoneNumber($userInformations[self::PHONE_NUMBER] ?? '')
            ->setPaypalUsername($userInformations[self::PAYPAL_USERNAME] ?? '');

        return $user;
    }

    public function save(?array $valuesToSave = null): bool
    {
        if (!$valuesToSave) {
            $valuesToSave = [
                self::USERNAME => $this->username,
                self::FIRST_NAME => $this->firstName,
                self::LAST_NAME => $this->lastName,
                self::PHONE_NUMBER => $this->phoneNumber,
                self::PAYPAL_USERNAME => $this->paypalUsername,
            ];
        }

        return parent::save($valuesToSave);
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;
        return $this;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;
        return $this;
    }

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;
        return $this;
    }

    public function getLastName(): string
    {
        return $this->lastName;
    }

    public function setPhoneNumber(string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;
        return $this;
    }

    public function getPhoneNumber(): string
    {
        return $this->phoneNumber;
    }

    public function setPaypalUsername(string $paypalUsername): self
    {
        $this->paypalUsername = $paypalUsername;
        return $this;
    }

    public function getPaypalUsername(): string
    {
        return $this->paypalUsername;
    }

    public function getLink()
    {
        return $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . '/v1/users/' . $this->getId();
    }
}
