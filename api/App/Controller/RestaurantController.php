<?php

namespace Taberu\Controller;

use Taberu\Exception\ResponseException;
use Taberu\Model\Restaurant;
use Taberu\Transformer\RestaurantList;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class RestaurantController
{

    public function getAllRestaurants(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $restaurants = Restaurant::all();
            $transformer = new RestaurantList($restaurants);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function createRestaurant(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $parsedBody = $request->getParsedBody();

        try {
            $restaurant = new Restaurant();
            $restaurant->setName($parsedBody['name'])
                ->setStreet($parsedBody['street'])
                ->setStreetNumber($parsedBody['streetNumber'])
                ->setZip($parsedBody['zip'])
                ->setCity($parsedBody['city'] ?? '')
                ->setDescription($parsedBody['description'] ?? '')
                ->setPhoneNumber($parsedBody['phoneNumber'] ?? '');
            $restaurant->create();

            $restaurant = Restaurant::findFirstOrFail([
                [Restaurant::ID, '=', $restaurant->getId()]
            ]);

            $transformer = new \Taberu\Transformer\Restaurant($restaurant);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\AlreadyExistException $e) {
            throw new ResponseException(409, $e->getMessage());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function getSpecificRestaurant(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $user = Restaurant::findFirstOrFail([
                [Restaurant::ID, '=', (int)$args['restaurantId']]
            ]);

            $transformer = new \Taberu\Transformer\Restaurant($user);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\AlreadyExistException $e) {
            throw new ResponseException(404, $e->getMessage());
        } catch (\Taberu\Exception\MutipleEntriesFoundException $e) {
            throw new ResponseException(400, $e->getMessage());
        }

        return $response;
    }

    public function updateRestaurant(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $parsedBody = $request->getParsedBody();

        try {
            $restaurant = Restaurant::findFirstOrFail([
                [Restaurant::ID, '=', (int)$args['restaurantId']]
            ]);

            if (isset($parsedBody['name'])) {
                $restaurant->setName($parsedBody['name']);
            }
            if (isset($parsedBody['street'])) {
                $restaurant->setStreet($parsedBody['street']);
            }
            if (isset($parsedBody['streetNumber'])) {
                $restaurant->setStreetNumber($parsedBody['streetNumber']);
            }
            if (isset($parsedBody['zip'])) {
                $restaurant->setZip($parsedBody['zip']);
            }
            if (isset($parsedBody['city'])) {
                $restaurant->setCity($parsedBody['city']);
            }
            if (isset($parsedBody['description'])) {
                $restaurant->setDescription($parsedBody['description']);
            }
            if (isset($parsedBody['phoneNumber'])) {
                $restaurant->setPhoneNumber($parsedBody['phoneNumber']);
            }

            $restaurant->update();

            $transformer = new \Taberu\Transformer\Restaurant($restaurant);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(409, $e->getMessage());
        }

        return $response;
    }
}
