<?php

namespace Taberu\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Taberu\Utils\Database;

class DefaultController
{
    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     *
     * styleline warum ist sie da hin gezogen ich bin in denken dorf was kann man dazu sagen ´´
     */
    public function addEntry(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $pdo = Database::getDB();

        return $response;
    }
}