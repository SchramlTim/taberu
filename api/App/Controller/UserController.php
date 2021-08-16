<?php

namespace Taberu\Controller;

use Taberu\Transformer\MenuList;
use Taberu\Transformer\OrderList;
use Taberu\Validator\JWT;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Taberu\Exception\LoginFailedException;
use Taberu\Exception\ResponseException;
use Taberu\Model\User;
use Taberu\Transformer\Token;
use Taberu\Transformer\User as TransformerUser;
use Taberu\Transformer\UserList;

class UserController
{
    public function register(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $parsedBody = $request->getParsedBody();

        try {
            $user = new User();
            $user->setUsername($parsedBody['username'])
                ->setFirstName($parsedBody['firstName'])
                ->setLastName($parsedBody['lastName'])
                ->setNewPassword($parsedBody['password'])
                ->setPhoneNumber($parsedBody['phoneNumber'] ?? '')
                ->setPaypalUsername($parsedBody['paypalUsername'] ?? '');
            $user->create();

            $user = User::findFirstOrFail([
                [User::USERNAME, '=', $parsedBody['username']]
            ]);

            $transformer = new TransformerUser($user);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\AlreadyExistException $e) {
            throw new ResponseException(409, $e->getMessage());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function login(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $parsedBody = $request->getParsedBody();

        try {
            $user = User::findFirstOrFail([
                [User::USERNAME, '=', $parsedBody['username']]
            ]);

            if (!$user->checkPassword($parsedBody['password'])) {
                throw new LoginFailedException('Wrong username or password');
            }

            $token = JWT::generate($user->getId());
            $userTransformer = new TransformerUser($user);
            $tokenTransformer = new Token($token);
            $response->getBody()->write($tokenTransformer->mergeJson(['user' => $userTransformer->getJson()]));
        } catch (\Taberu\Exception\LoginFailedException $e) {
            throw new ResponseException(401, $e->getMessage());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function getSpecificUser(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $user = User::findFirstOrFail([
                [User::ID, '=', (int)$args['userId']]
            ]);

            $transformer = new TransformerUser($user);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\AlreadyExistException $e) {
            throw new ResponseException(404, $e->getMessage());
        } catch (\Taberu\Exception\MutipleEntriesFoundException $e) {
            throw new ResponseException(400, $e->getMessage());
        }

        return $response;
    }

    public function updateUser(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $parsedBody = $request->getParsedBody();

        try {
            $user = User::findFirstOrFail([
                [User::ID, '=', (int)$args['userId']]
            ]);

            if (isset($parsedBody['firstName'])) {
                $user->setFirstName($parsedBody['firstName']);
            }
            if (isset($parsedBody['lastName'])) {
                $user->setLastName($parsedBody['lastName']);
            }
            if (isset($parsedBody['phoneNumber'])) {
                $user->setPhoneNumber($parsedBody['phoneNumber']);
            }
            if (isset($parsedBody['paypalUsername'])) {
                $user->setPaypalUsername($parsedBody['paypalUsername']);
            }

            $user->update();

            $transformer = new TransformerUser($user);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(409, $e->getMessage());
        }

        return $response;
    }

    public function getAllUsers(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $users = User::all();
            $transformer = new UserList($users);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function getUserOrders(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $user = User::findFirstOrFail([
                [User::ID, '=', (int)$args['userId']]
            ]);
            $orders = $user->getOrders();

            $transformer = new OrderList($orders);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function getUserMenus(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $user = User::findFirstOrFail([
                [User::ID, '=', (int)$args['userId']]
            ]);
            $menus = $user->getMenus();

            $transformer = new MenuList($menus);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function deleteUser(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $user = User::findFirstOrFail([
                [User::ID, '=', (int)$args['userId']]
            ]);
            if ($user) {
                User::delete([
                    [User::ID, '=', (int)$args['userId']]
                ]);
            }
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response->withStatus(202);
    }
}
