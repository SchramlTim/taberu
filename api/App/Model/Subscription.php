<?php

namespace Taberu\Model;

use LogicException;
use RuntimeException;
use Taberu\Exception\MultipleEntriesFoundException;
use Taberu\Exception\NotFoundException;
use Taberu\Utils\Database;

class Subscription extends BaseModel
{
    use ORMTrait;

    const USER_ID = 'subscription.user_id';
    const ENDPOINT_URL = 'subscription.endpoint_url';
    const PUBLIC_KEY = 'subscription.public_key';
    const AUTH_TOKEN = 'subscription.auth_token';

    protected static array $_loadedFields = [
        self::USER_ID,
        self::ENDPOINT_URL,
        self::PUBLIC_KEY,
        self::AUTH_TOKEN,
    ];

    public static string $_table = 'subscription';

    private string $userId = '';
    private string $endpointUrl = '';
    private string $publicKey = '';
    private string $authToken = '';

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
        $object->setUserId($data[self::USER_ID])
            ->setEndpointUrl($data[self::ENDPOINT_URL])
            ->setPublicKey($data[self::PUBLIC_KEY] ?? '')
            ->setAuthToken($data[self::AUTH_TOKEN] ?? '');

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
              self::USER_ID => $this->getUserId(),
              self::ENDPOINT_URL => $this->getEndpointUrl(),
              self::PUBLIC_KEY => $this->getPublicKey(),
              self::AUTH_TOKEN => $this->getAuthToken(),
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
              self::USER_ID => $this->getUserId(),
              self::ENDPOINT_URL => $this->getEndpointUrl(),
              self::PUBLIC_KEY => $this->getPublicKey(),
              self::AUTH_TOKEN => $this->getAuthToken(),
            ];
        }

        return self::createEntity($valuesToSave);
    }

    /**
     * @return string
     */
    public function getUserId(): string
    {
        return $this->userId;
    }

    /**
     * @param string $name
     * @return $this
     */
    public function setUserId(string $userId): self
    {
        $this->userId = $userId;
        return $this;
    }

    /**
     * @return string
     */
    public function getEndpointUrl(): string
    {
        return $this->endpointUrl;
    }

    /**
     * @param string $street
     * @return $this
     */
    public function setEndpointUrl(string $endpointUrl): self
    {
        $this->endpointUrl = $endpointUrl;
        return $this;
    }

    /**
     * @return string
     */
    public function getPublicKey(): string
    {
        return $this->publicKey;
    }

    /**
     * @param string $streetNumber
     * @return $this
     */
    public function setPublicKey(string $publicKey): self
    {
        $this->publicKey = $publicKey;
        return $this;
    }

    /**
     * @return string
     */
    public function getAuthToken(): string
    {
        return $this->authToken;
    }

    /**
     * @param string $zip
     * @return $this
     */
    public function setAuthToken(string $authToken): self
    {
        $this->authToken = $authToken;
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
        return 'https://' . $_SERVER['HTTP_HOST'] . '/notification/subscription';
    }
}
