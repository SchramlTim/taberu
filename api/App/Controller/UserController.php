<?php

namespace Taberu\Controller;

use Taberu\Utils\Database;
use Taberu\Validator\JWT;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\StreamInterface;
use RuntimeException;
use Slim\Psr7\Cookies;
use Slim\Psr7\UploadedFile;
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
        } catch (\RuntimeException $e) {
            throw new ResponseException(409, $e->getMessage());
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

            if(!$user->checkPassword($parsedBody['password'])) {
                throw new RuntimeException('Wrong username or password222');
            }

            $token = JWT::generate($user->getId());
            $transformer = new Token($token);
            $response->getBody()->write($transformer->getJson());
        } catch (\RuntimeException $e) {
            throw new ResponseException(401, $e->getMessage());
        }

        return $response;
    }

    public function getSpecificUser(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $parsedBody = $request->getParsedBody();

        try {
            $user = User::findFirstOrFail([
                [User::ID, '=', (int)$args['userId']]
            ]);

            $transformer = new TransformerUser($user);
            $response->getBody()->write($transformer->getJson());
        } catch (\RuntimeException $e) {
            throw new ResponseException(404, $e->getMessage());
        } catch (\LogicException $e) {
            throw new ResponseException(400, $e->getMessage());
        } catch (\Exception $e) {
            throw new ResponseException(500, $e->getMessage());
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
        } catch (\RuntimeException $e) {
            throw new ResponseException(409, $e->getMessage());
        } catch (\Exception $e) {
            throw new ResponseException(500, $e->getMessage());
        }

        return $response;
    }

    public function getAllUsers(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $users = User::all();
        $transformer = new UserList($users);
        $response->getBody()->write($transformer->getJson());
        return $response;
    }

    public function getUserOrders(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write("Function " . __FUNCTION__ . " is not implemented");
        return $response;
    }

    public function getUserMenus(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write("Function " . __FUNCTION__ . " is not implemented");
        return $response;
    }
}