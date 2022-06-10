<?php

namespace Taberu\Controller;

use Taberu\Exception\ResponseException;
use Taberu\Model\Menu;
use Taberu\Model\MenuItem;
use Taberu\Transformer\MenuItemList;
use Taberu\Transformer\MenuList;
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
        try {
            $menus = Menu::all();
            $transformer = new MenuList($menus);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function createMenu(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $queryParameter = $request->getQueryParams();
        $parsedBody = $request->getParsedBody();

        try {
            $menu = new Menu();
            $menu->setName($parsedBody['name'])
                ->setDescription($parsedBody['description'])
                ->setCreatorID($parsedBody['creatorId'] ?? $queryParameter['sub']);

            if (isset($parsedBody['restaurantId'])) {
                $menu->setRestaurantId($parsedBody['restaurantId']);
            }

            $menu->create();

            $menu = Menu::findFirstOrFail([
                [Menu::ID, '=', $menu->getId()]
            ]);

            $transformer = new \Taberu\Transformer\Menu($menu);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\AlreadyExistException $e) {
            throw new ResponseException(409, $e->getMessage());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function getSpecificMenu(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $menu = Menu::findFirstOrFail([
                [Menu::ID, '=', (int)$args['menuId']]
            ]);

            $transformer = new \Taberu\Transformer\Menu($menu);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        } catch (\Taberu\Exception\MutipleEntriesFoundException $e) {
            throw new ResponseException(400, $e->getMessage());
        }

        return $response;
    }

    public function updateMenu(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $parsedBody = $request->getParsedBody();

        try {
            $menu = Menu::findFirstOrFail([
                [Menu::ID, '=', (int)$args['menuId']]
            ]);

            if (isset($parsedBody['name'])) {
                $menu->setName($parsedBody['name']);
            }
            if (isset($parsedBody['description'])) {
                $menu->setDescription($parsedBody['description']);
            }
            if (isset($parsedBody['restaurantId'])) {
                $menu->setRestaurantId($parsedBody['restaurantId']);
            }
            if (isset($parsedBody['creatorId'])) {
                $menu->setCreatorID($parsedBody['creatorId']);
            }

            $menu->update();

            $transformer = new \Taberu\Transformer\Menu($menu);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function deleteMenu(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write("Function " . __FUNCTION__ . " is not implemented");
        return $response;
    }

    public function getAllMenuItems(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $menu = Menu::findFirstOrFail([
                [Menu::ID, '=', (int)$args['menuId']]
            ]);

            $menuItems = $menu->getMenuItems();
            $transformer = new MenuItemList($menuItems);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function createMenuItem(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $parsedBody = $request->getParsedBody();

        try {
            $menu = Menu::findFirstOrFail([
                [Menu::ID, '=', (int)$args['menuId']]
            ]);

            $item = new MenuItem();
            $item->setMenuId($menu->getId())
                ->setName($parsedBody['name'])
                ->setDescription($parsedBody['description'])
                ->setPrice($parsedBody['price']);
            $item->create();

            $item = MenuItem::findFirstOrFail([
                [MenuItem::ID, '=', $item->getId()]
            ]);

            $transformer = new \Taberu\Transformer\MenuItem($item);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\AlreadyExistException $e) {
            throw new ResponseException(409, $e->getMessage());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function updateMenuItem(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $parsedBody = $request->getParsedBody();

        try {
            /** @var MenuItem $item */
            $item = MenuItem::findFirstOrFail([
                [Menu::ID, '=', (int)$args['menuId']],
                [MenuItem::ID, '=', (int)$args['itemId']]
            ]);

            if (isset($parsedBody['name'])) {
                $item->setName($parsedBody['name']);
            }
            if (isset($parsedBody['description'])) {
                $item->setDescription($parsedBody['description']);
            }
            if (isset($parsedBody['menuId'])) {
                $item->setMenuId($parsedBody['menuId']);
            }
            if (isset($parsedBody['price'])) {
                $item->setPrice($parsedBody['price']);
            }

            $item->update();

            $transformer = new \Taberu\Transformer\MenuItem($item);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function getAllMenuCategories(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $menu = Menu::findFirstOrFail([
            [Menu::ID, '=', (int)$args['menuId']]
        ]);

        $categories = $menu->getCategories();

        return $response;
    }

    public function deleteMenuItem(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write("Function " . __FUNCTION__ . " is not implemented");
        return $response;
    }
}
