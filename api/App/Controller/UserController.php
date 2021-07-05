<?php

namespace Taberu\Controller;

use Taberu\Utils\Database;
use Taberu\Validator\JWT;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\StreamInterface;
use Slim\Psr7\Cookies;
use Slim\Psr7\UploadedFile;

class UserController
{
    public function register(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $registerInformation = $request->getParsedBody();

        $pdo = Database::getDB();
        $stm = $pdo->prepare('SELECT count(*) FROM users WHERE username = ?');
        $stm->execute([$registerInformation['username']]);
        $existingUsers = $stm->fetch(\PDO::FETCH_ASSOC);

        if ($existingUsers['count']) {
            return $response->withStatus(422);
        }

        $salt = md5(json_encode($registerInformation) . (new \DateTime())->getTimestamp());

        $stmt = $pdo->prepare("INSERT INTO users (username, password, password_salt, first_name, last_name) VALUES (?, ?, ?, ?, ?)");
        $stmt->bindValue(1, $registerInformation['username']);
        $stmt->bindValue(2, md5($registerInformation['password'] . $salt));
        $stmt->bindValue(3, $salt);
        $stmt->bindValue(4, $registerInformation['first_name']);
        $stmt->bindValue(5, $registerInformation['last_name']);
        $stmt->execute();

        return $response;
    }

    public function login(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $loginInformation = $request->getParsedBody();

        $pdo = Database::getDB();
        $stm = $pdo->prepare('SELECT id, username, password, password_salt FROM users WHERE username = ? LIMIT 1');
        $stm->execute([$loginInformation['username']]);
        $userInformation = $stm->fetch(\PDO::FETCH_ASSOC);

        $inputPassword = md5($loginInformation['password'] . $userInformation['password_salt']);
        $actualPassword = $userInformation['password'];

        if ($inputPassword !== $actualPassword) {
            return $response->withStatus(401);
        }

        $token = JWT::generate($userInformation['id']);

        $response->getBody()->write(json_encode(["token" => $token]));
        return $response;
    }

    public function logout(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        // go back to header based requests
        $token = $request->getCookieParams('token');

        if (!$token) {
            return $response->withStatus(400);
        }

        $cookies = new Cookies();
        $cookies->set('token', ['value' => '', 'expires' => time() + strtotime("-1 day", time()), 'path' => '/', 'samesite' => 'None', 'secure' => '0']);

        return $response->withHeader('Set-Cookie', $cookies->toHeaders());
    }
}