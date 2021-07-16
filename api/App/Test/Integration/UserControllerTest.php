<?php

namespace Taberu\Test\Integration;

use PHPUnit\Framework\TestCase;
use Slim\App as SlimApp;
use Slim\Psr7\Environment;
use Taberu\App;

class UserControllerTest extends RoutingTestCase
{
    private SlimApp $app;

    protected function setUp(): void
    {
        parent::setUp();
        $this->app = (new App())->get();
    }

    public function testThatUserRouteCantGetAccessedWithoutValidToken(): void
    {
        $req = $this->createRequest('GET', '/v1/users/');
        $request = $req->withParsedBody([]);
        $response = $this->app->handle($request);

        $this->assertEquals($response->getStatusCode(), 401);
    } 
}