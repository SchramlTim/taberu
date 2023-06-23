<?php

namespace Taberu\Controller;

use Taberu\Exception\ResponseException;
use Taberu\Model\Subscription;
use Taberu\Transformer\RestaurantList;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class NotificationController 
{
    public function getPublicToken(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $restaurants = Subscription::all();
            var_dump($restaurants);
            $response->getBody()->write('');
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }
}
