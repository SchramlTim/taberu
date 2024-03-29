<?php

namespace Taberu\Controller;

use Taberu\Exception\ResponseException;
use Taberu\Model\Bowl;
use Taberu\Model\Order;
use Taberu\Model\OrderItem;
use Taberu\Model\User;
use Taberu\Transformer\BowlList;
use Taberu\Transformer\OrderList;
use Taberu\Transformer\UserList;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use DateTime;
use Taberu\Model\Menu;
use Taberu\Utils\NotificationManager;

class BowlController
{

    public function getAllBowls(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $queryParameter = $request->getQueryParams();
        $where = [];
        if (isset($queryParameter['filter']['orderDeadline'])) {
            $where[] = [Bowl::ORDER_DEADLINE, '>=', $queryParameter['filter']['orderDeadline']];
        }

        try {
            $bowls = Bowl::all($where);
            $transformer = new BowlList($bowls);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function createBowl(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $queryParameter = $request->getQueryParams();
        $parsedBody = $request->getParsedBody();

        try {
            $bowl = new Bowl();
            $bowl->setCreatorId($parsedBody['creatorId'] ?? $queryParameter['sub'])
                ->setName($parsedBody['name'])
                ->setDescription($parsedBody['description'])
                ->setOrderDeadline(new DateTime($parsedBody['orderDeadline']))
                ->setArriveDate(new DateTime($parsedBody['arriveDate']))
                ->setMenuId($parsedBody['menuId'])
                ->setStatus('OPEN');
            $bowl->create();

            $bowl = Bowl::findFirstOrFail([
                [Bowl::ID, '=', $bowl->getId()]
            ]);

            $transformer = new \Taberu\Transformer\Bowl($bowl);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\AlreadyExistException $e) {
            throw new ResponseException(409, $e->getMessage());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function getSpecificBowl(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $bowl = Bowl::findFirstOrFail([
                [Bowl::ID, '=', (int)$args['bowlId']]
            ]);

            $transformer = new \Taberu\Transformer\Bowl($bowl);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        } catch (\Taberu\Exception\MultipleEntriesFoundException $e) {
            throw new ResponseException(400, $e->getMessage());
        }

        return $response;
    }

    public function updateBowl(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $parsedBody = $request->getParsedBody();

        try {
            $bowl = Bowl::findFirstOrFail([
                [Bowl::ID, '=', (int)$args['bowlId']]
            ]);

            if (isset($parsedBody['name'])) {
                $bowl->setName($parsedBody['name']);
            }
            if (isset($parsedBody['creatorId'])) {
                $bowl->setCreatorId($parsedBody['creatorId']);
            }
            if (isset($parsedBody['description'])) {
                $bowl->setDescription($parsedBody['description']);
            }
            if (isset($parsedBody['orderDeadline'])) {
                $bowl->setOrderDeadline(new DateTime($parsedBody['orderDeadline']));
            }
            if (isset($parsedBody['arriveDate'])) {
                $bowl->setArriveDate(new DateTime($parsedBody['arriveDate']));
            }
            if (isset($parsedBody['menuId'])) {
                $bowl->setMenuId($parsedBody['menuId']);
            }

            $bowl->update();

            $transformer = new \Taberu\Transformer\Bowl($bowl);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(409, $e->getMessage());
        }

        return $response;
    }

    public function deleteBowl(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write("Function " . __FUNCTION__ . " is not implemented");
        return $response;
    }

    public function getAllBowlOrders(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $bowl = Bowl::findFirstOrFail([
                [Bowl::ID, '=', (int)$args['bowlId']]
            ]);

            $orders = $bowl->getOrders();
            $transformer = new OrderList($orders);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function createBowlOrder(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $queryParameter = $request->getQueryParams();
        $parsedBody = $request->getParsedBody();

        try {
            $bowl = Bowl::findFirstOrFail([
                [Bowl::ID, '=', (int)$args['bowlId']]
            ]);

            $bufferTime = $bowl->getOrderDeadline()->modify('+5 minutes');
            if ($bufferTime <= new \DateTime()) {
                throw new ResponseException(410, 'Deadline expired');
            }

            $menu = Menu::findFirstOrFail([
                [Menu::ID, '=', $bowl->getMenuId()]
            ]);
            $menuItems = $menu->getMenuItems();
            $items = array_map(function($item) use ($menuItems) {
                foreach ($menuItems as $menuItem) {
                    if ($menuItem->getId() === $item['id']) {
                        return [
                            'name' => $menuItem->getName(),
                            'price' => $menuItem->getPrice(),
                            'count' => $item['count'] ?? 1,
                            'additionalInformation' => $item['additionalInformation'] ?? ''
                        ];
                    }   
                }
            }, $parsedBody['items']);

            $finalPrice = array_reduce($items, function (float $finalPrice, array $item) {
                return $finalPrice + ($item['price'] * $item['count']);
            }, 0.00);

            $order = new Order();
            $order->setBowlId($bowl->getId())
                ->setUserId($parsedBody['userId'] ?? $queryParameter['sub'])
                ->setPaymentMethod($parsedBody['paymentMethod'])
                ->setFinalPrice($finalPrice);
            $order->create();

            $order = Order::findFirstOrFail([
                [Order::ID, '=', $order->getId()]
            ]);

            foreach($items as $item) {
                $orderItem = new OrderItem();
                $orderItem->setOrderId($order->getId())
                    ->setName($item['name'])
                    ->setPrice($item['price'])
                    ->setCount($item['count'])
                    ->setAdditionalInformation($item['additionalInformation']);
                $orderItem->create();
            }

            $transformer = new \Taberu\Transformer\Order($order);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\AlreadyExistException $e) {
            throw new ResponseException(409, $e->getMessage());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function updateBowlOrder(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $parsedBody = $request->getParsedBody();

        try {
            $order = Order::findFirstOrFail([
                [Bowl::ID, '=', (int)$args['bowlId']],
                [Order::ID, '=', (int)$args['orderId']]
            ]);

            if (isset($parsedBody['finalPrice'])) {
                $order->setFinalPrice($parsedBody['finalPrice']);
            }
            if (isset($parsedBody['paymentStatus'])) {
                $order->setPaymentStatus($parsedBody['paymentStatus']);
            }
            if (isset($parsedBody['paymentMethod'])) {
                $order->setPaymentMethod($parsedBody['paymentMethod']);
            }
            if (isset($parsedBody['orderStatus'])) {
                $order->setOrderStatus($parsedBody['orderStatus']);
            }

            $order->update();

            if ($order->getPaymentStatus() === 'PAID') {
              NotificationManager::send($order->getUserId(), [
                'title' => 'Order marked as paid',
                'icon' => '/logo_192x192.png', 
                'badge' => '/transparent_icon_192x192.png',
              ]);
            }

            $transformer = new \Taberu\Transformer\Order($order);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function deleteBowlOrder(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write("Function " . __FUNCTION__ . " is not implemented");
        return $response;
    }

    public function getAllBowlUser(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $bowl = Bowl::findFirstOrFail([
                [Bowl::ID, '=', (int)$args['bowlId']]
            ]);

            $users = $bowl->getUsers();

            $transformer = new UserList($users);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function addBowlUser(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $parsedBody = $request->getParsedBody();

        try {
            $bowl = Bowl::findFirstOrFail([
                [Bowl::ID, '=', (int)$args['bowlId']]
            ]);

            $user = User::findFirstOrFail([
                [User::ID, '=', $parsedBody['userId']]
            ]);

            $bowl->addUser($user);
            $transformer = new \Taberu\Transformer\Bowl($bowl);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\AlreadyExistException $e) {
            throw new ResponseException(409, $e->getMessage());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function deleteBowlUser(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write("Function " . __FUNCTION__ . " is not implemented");
        return $response;
    }
}
