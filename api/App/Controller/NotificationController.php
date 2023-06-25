<?php

namespace Taberu\Controller;

use Taberu\Exception\ResponseException;
use Taberu\Model\Subscription;
use Taberu\Model\User;
use Taberu\Transformer\RestaurantList;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Taberu\Exception\AlreadyExistException;

class NotificationController 
{
    public function getPublicToken(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $response->getBody()->write(json_encode(['data' => ['token' => getenv('NOTIFICATION_PUBLIC_KEY') ?: 'no_token']]));
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function createSubscription(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $parsedBody = $request->getParsedBody();
        $queryParameter = $request->getQueryParams();

        try {
            $user = User::findFirstOrFail([
                [User::ID, '=', $queryParameter['sub']]
            ]);

            $subscription = new Subscription();
            $subscription->setUserId($user->getId())
                ->setEndpointUrl($parsedBody['endpointUrl'])
                ->setPublicKey($parsedBody['publicKey'])
                ->setAuthToken($parsedBody['authToken']);
            $subscription->create();

            $subscription = Subscription::findFirstOrFail([
                [Subscription::USER_ID, '=', $subscription->getUserId()]
            ]);

            $response->getBody()->write(json_encode((object) []));
        } catch (\Taberu\Exception\AlreadyExistException $e) {
            throw new ResponseException(409, $e->getMessage());
        }

        return $response;
    }
}
