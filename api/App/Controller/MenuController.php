<?php

namespace Taberu\Controller;

use Taberu\Utils\Database;
use Taberu\Validator\JWT;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\StreamInterface;
use Slim\Psr7\Cookies;
use Slim\Psr7\UploadedFile;

class MenuController
{

    public function getAllMenus(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write("Function " . __FUNCTION__ . " is not implemented");
        return $response;
    }

    public function createMenu(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write("Function " . __FUNCTION__ . " is not implemented");
        return $response;
    }

    public function getSpecificMenu(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write("Function " . __FUNCTION__ . " is not implemented");
        return $response;
    }

    public function updateMenu(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write("Function " . __FUNCTION__ . " is not implemented");
        return $response;
    }

    public function deleteMenu(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write("Function " . __FUNCTION__ . " is not implemented");
        return $response;
    }

    public function getAllMenuItems(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write("Function " . __FUNCTION__ . " is not implemented");
        return $response;
    }

    public function createMenuItem(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write("Function " . __FUNCTION__ . " is not implemented");
        return $response;
    }

    public function updateMenuItem(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write("Function " . __FUNCTION__ . " is not implemented");
        return $response;
    }

    public function deleteMenuItem(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write("Function " . __FUNCTION__ . " is not implemented");
        return $response;
    }
}
