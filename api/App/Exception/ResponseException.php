<?php

namespace Taberu\Exception;

class ResponseException extends \RuntimeException
{

    protected int $statusCode;

    public function __construct(int $statusCode, string $message)
    {
        parent::__construct($message);

        $this->statusCode = $statusCode;
    }

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }
}