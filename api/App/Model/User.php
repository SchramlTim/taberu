<?php

namespace Taberu\Model;

use LogicException;
use RuntimeException;
use Taberu\Exception\MutipleEntriesFoundException;
use Taberu\Exception\NotFoundException;
use Taberu\Utils\Database;

class User extends BaseModel
{
    use ORMTrait;

    const USERNAME = 'username';
    const FIRST_NAME = 'first_name';
    const LAST_NAME = 'last_name';
    const PHONE_NUMBER = 'phone_number';
    const PAYPAL_USERNAME = 'paypal_username';
    const PASSWORD = 'password';
    const PASSWORD_SALT = 'password_salt';

    protected static array $_loadedFields = [
        self::ID,
        self::USERNAME,
        self::FIRST_NAME,
        self::LAST_NAME,
        self::PHONE_NUMBER,
        self::PAYPAL_USERNAME,
        self::PASSWORD,
        self::PASSWORD_SALT,
    ];

    public static string $_table = 'users';

    private string $username = '';
    private string $firstName = '';
    private string $lastName = '';
    private string $phoneNumber = '';
    private string $paypalUsername = '';
    private string $passwordSalt = '';
    private string $password = '';

    /**
     * User constructor.
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
            ->setUsername($data[self::USERNAME] ?? '')
            ->setFirstName($data[self::FIRST_NAME] ?? '')
            ->setLastName($data[self::LAST_NAME] ?? '')
            ->setPhoneNumber($data[self::PHONE_NUMBER] ?? '')
            ->setPaypalUsername($data[self::PAYPAL_USERNAME] ?? '')
            ->setPassword($data[self::PASSWORD] ?? '')
            ->setPasswordSalt($data[self::PASSWORD_SALT] ?? '');

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
                self::USERNAME => $this->getUsername(),
                self::FIRST_NAME => $this->getFirstName(),
                self::LAST_NAME => $this->getLastName(),
                self::PHONE_NUMBER => $this->getPhoneNumber(),
                self::PAYPAL_USERNAME => $this->getPaypalUsername(),
            ];
        }

        return $this->updateEntity($valuesToSave);
    }

    /**
     * @param array|null $valuesToSave
     * @return bool
     */
    public function create(?array $valuesToSave = null): bool
    {
        if (!$valuesToSave) {
            $valuesToSave = [
                self::USERNAME => $this->getUsername(),
                self::FIRST_NAME => $this->getFirstName(),
                self::LAST_NAME => $this->getLastName(),
                self::PHONE_NUMBER => $this->getPhoneNumber(),
                self::PAYPAL_USERNAME => $this->getPaypalUsername(),
                self::PASSWORD => $this->getPassword(),
                self::PASSWORD_SALT => $this->getPasswordSalt(),
            ];
        }

        return $this->createEntity($valuesToSave);
    }

    /**
     * @param string $username
     * @return $this
     */
    public function setUsername(string $username): self
    {
        $this->username = $username;
        return $this;
    }

    /**
     * @return string
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * @param string $firstName
     * @return $this
     */
    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;
        return $this;
    }

    /**
     * @return string
     */
    public function getFirstName(): string
    {
        return $this->firstName;
    }

    /**
     * @param string $lastName
     * @return $this
     */
    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;
        return $this;
    }

    /**
     * @return string
     */
    public function getLastName(): string
    {
        return $this->lastName;
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

    /**
     * @return string
     */
    public function getPhoneNumber(): string
    {
        return $this->phoneNumber;
    }

    /**
     * @param string $paypalUsername
     * @return $this
     */
    public function setPaypalUsername(string $paypalUsername): self
    {
        $this->paypalUsername = $paypalUsername;
        return $this;
    }

    /**
     * @return string
     */
    public function getPaypalUsername(): string
    {
        return $this->paypalUsername;
    }

    /**
     * @return string
     */
    protected function createNewPasswordSalt(): string
    {
        return hash('sha256', (json_encode([
            self::USERNAME => $this->getUsername(),
            self::FIRST_NAME => $this->getFirstName(),
            self::LAST_NAME => $this->getLastName(),
            self::PHONE_NUMBER => $this->getPhoneNumber(),
            self::PAYPAL_USERNAME => $this->getPaypalUsername(),
        ]) . (new \DateTime())->getTimestamp()));
    }

    /**
     * @param string $passwordSalt
     * @return $this
     */
    protected function setPasswordSalt(string $passwordSalt): self
    {
        $this->passwordSalt = $passwordSalt;
        return $this;
    }

    /**
     * @return string
     */
    public function getPasswordSalt(): string
    {
        return $this->passwordSalt;
    }

    /**
     * @param string $password
     * @return $this
     */
    protected function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    /**
     * @param string $password
     * @return $this
     */
    public function setNewPassword(string $password): self
    {
        $salt = $this->getPasswordSalt();
        if (!strlen($salt)) {
            $salt = $this->createNewPasswordSalt();
            $this->setPasswordSalt($salt);
        }
        
        $this->setPassword($this->hashPassword($password, $salt));

        return $this;
    }

    /**
     * @param string $password
     * @param string $salt
     * @return string
     */
    protected function hashPassword(string $password, string $salt): string
    {
        return hash('sha256', $password . $salt);
    }

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * @param string $inputPassword
     * @return bool
     */
    public function checkPassword(string $inputPassword): bool
    {
        $inputPasswordHash = $this->hashPassword($inputPassword, $this->getPasswordSalt());
        return $inputPasswordHash === $this->getPassword();
    }

    /**
     * @return string
     */
    public static function getTable(): string
    {
        return self::$_table;
    }

    /**
     * @return array
     */
    public function getOrders(): array
    {
        return Order::all([
            [Order::USER_ID, '=', $this->getId()]
        ]);
    }

    /**
     * @return array
     */
    public function getMenus(): array
    {
        return Menu::all([
            [Menu::CREATOR_ID, '=', $this->getId()]
        ]);
    }

    /**
     * @return string
     */
    public function getLink(): string
    {
        return $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . '/v1/users/' . $this->getId();
    }
}
