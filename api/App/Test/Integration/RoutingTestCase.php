<?php

namespace Taberu\Test\Integration;

use PHPUnit\Framework\TestCase;
use Slim\Psr7\Factory\StreamFactory;
use Slim\Psr7\Headers;
use Slim\Psr7\Request;
use Slim\Psr7\Uri;

class RoutingTestCase extends TestCase
{
    protected function createRequest(
        string $method,
        string $path,
        array $headers = ['HTTP_ACCEPT' => 'application/json'],
        array $cookies = [],
        array $serverParams = []
    ): Request {
        $uri = new Uri('', '', 80, $path);
        $handle = fopen('php://temp', 'w+');
        $stream = (new StreamFactory())->createStreamFromResource($handle);

        $headers = new Headers();
        foreach ($headers as $name => $value) {
            $headers->addHeader($name, $value);
        }

        return new Request($method, $uri, $headers, $cookies, $serverParams, $stream);
    }
}
