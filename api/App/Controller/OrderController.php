<?php

namespace Taberu\Controller;

use Taberu\Exception\ResponseException;
use Taberu\Model\Order;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Taberu\Model\OrderItem;

class OrderController
{
    public function getSpecificOrder(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $order = Order::findFirstOrFail([
                [Order::ID, '=', (int)$args['orderId']]
            ]);

            $transformer = new \Taberu\Transformer\Order($order);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\AlreadyExistException $e) {
            throw new ResponseException(409, $e->getMessage());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function getSpecificOrderItems(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $items = OrderItem::all([
                [OrderItem::ORDER_ID, '=', (int)$args['orderId']]
            ]);

            $transformer = new \Taberu\Transformer\OrderItemList($items);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\AlreadyExistException $e) {
            throw new ResponseException(409, $e->getMessage());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }
}
