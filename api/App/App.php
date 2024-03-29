<?php

namespace Taberu;

use Slim\App as SlimApp;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Interfaces\RouteCollectorProxyInterface;
use Taberu\Controller\BowlController;
use Taberu\Controller\CategoryController;
use Taberu\Controller\DepartmentController;
use Taberu\Controller\MenuController;
use Taberu\Controller\OrderController;
use Taberu\Controller\RestaurantController;
use Taberu\Controller\NotificationController;
use Taberu\Controller\ProcessController;
use Taberu\Middleware\Cors;
use Taberu\Middleware\CorsMiddleware;
use Taberu\Middleware\JsonResponseMiddleware;
use Taberu\Middleware\JWTAuthMiddleware;
use Taberu\Controller\UserController;
use Taberu\Utils\JsonErrorHandler;

class App
{
    private SlimApp $app;

    /**
     *
     */
    public function __construct()
    {
        $app = AppFactory::create();
        $app->addRoutingMiddleware();
        $app->addBodyParsingMiddleware();
        $app->add(new CorsMiddleware());
        $app->add(new JsonResponseMiddleware());

        $errorMiddleware = $app->addErrorMiddleware(true, true, true);
        $errorMiddleware->setDefaultErrorHandler(new JsonErrorHandler($app));

        $app->options('/{routes:.+}', function ($request, $response, $args) {
            return $response;
        });

        $app->add(function ($request, $handler) {
            $response = $handler->handle($request);
            return $response
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization, x-token')
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        });

        $app->get('[/]', function (Request $request, Response $response, array $args) {
            $response->getBody()->write("Nothing here");
            return $response;
        });

        $app->group('/v1', function (RouteCollectorProxyInterface $group) use ($app) {
            $group->group('/users', function (RouteCollectorProxyInterface $group) use ($app) {
                $group->post('/register[/]', UserController::class.':register');
                $group->post('/login[/]', UserController::class.':login');

                $group->get('/{userId}[/]', UserController::class.':getSpecificUser')->add(new JWTAuthMiddleware());
                $group->patch('/{userId}[/]', UserController::class.':updateUser')->add(new JWTAuthMiddleware());
                $group->get('[/]', UserController::class.':getAllUsers')->add(new JWTAuthMiddleware());
                $group->get('/{userId}/orders[/]', UserController::class.':getUserOrders')->add(new JWTAuthMiddleware());
                $group->get('/{userId}/menus[/]', UserController::class.':getUserMenus')->add(new JWTAuthMiddleware());

                $group->delete('/{userId}[/]', UserController::class.':deleteUser')->add(new JWTAuthMiddleware());
            });
            

            $group->group('/departments', function (RouteCollectorProxyInterface $group) use ($app) {
                $group->get('[/]', DepartmentController::class.':getAllDepartments');
                $group->post('[/]', DepartmentController::class.':createDepartment');
                $group->get('/{departmentId}[/]', DepartmentController::class.':getSpecificDepartment');
                $group->patch('/{departmentId}[/]', DepartmentController::class.':updateDepartment');
                $group->delete('/{departmentId}[/]', DepartmentController::class.':deleteDepartment');
                
                $group->get('/{departmentId}/users[/]', DepartmentController::class.':getAllDepartmentUser');
            })->add(new JWTAuthMiddleware());

            $group->group('/bowls', function (RouteCollectorProxyInterface $group) use ($app) {
                $group->get('[/]', BowlController::class.':getAllBowls');
                $group->post('[/]', BowlController::class.':createBowl');
                $group->get('/{bowlId}[/]', BowlController::class.':getSpecificBowl');
                $group->patch('/{bowlId}[/]', BowlController::class.':updateBowl');
                $group->delete('/{bowlId}[/]', BowlController::class.':deleteBowl');

                $group->get('/{bowlId}/orders[/]', BowlController::class.':getAllBowlOrders');
                $group->post('/{bowlId}/orders[/]', BowlController::class.':createBowlOrder');
                $group->patch('/{bowlId}/orders/{orderId}[/]', BowlController::class.':updateBowlOrder');
                $group->delete('/{bowlId}/orders/{orderId}[/]', BowlController::class.':deleteBowlOrder');

                $group->get('/{bowlId}/users[/]', BowlController::class.':getAllBowlUser');
                $group->post('/{bowlId}/users[/]', BowlController::class.':addBowlUser');
                $group->delete('/{bowlId}/users/{userId}[/]', BowlController::class.':deleteBowlUser');
            })->add(new JWTAuthMiddleware());

            $group->group('/orders', function (RouteCollectorProxyInterface $group) use ($app) {
                $group->get('/{orderId}[/]', OrderController::class.':getSpecificOrder');
                $group->get('/{orderId}/items[/]', OrderController::class.':getSpecificOrderItems');
            })->add(new JWTAuthMiddleware());

            $group->group('/menus', function (RouteCollectorProxyInterface $group) use ($app) {
                $group->get('[/]', MenuController::class.':getAllMenus');
                $group->post('[/]', MenuController::class.':createMenu');
                $group->get('/{menuId}[/]', MenuController::class.':getSpecificMenu');
                $group->patch('/{menuId}[/]', MenuController::class.':updateMenu');
                $group->delete('/{menuId}[/]', MenuController::class.':deleteMenu');
                
                $group->get('/{menuId}/categories[/]', MenuController::class.':getAllMenuCategories');

                $group->get('/{menuId}/items[/]', MenuController::class.':getAllMenuItems');
                $group->post('/{menuId}/items[/]', MenuController::class.':createMenuItem');
                $group->patch('/{menuId}/items/{itemId}[/]', MenuController::class.':updateMenuItem');
                $group->delete('/{menuId}/items/{itemId}[/]', MenuController::class.':deleteMenuItem');
            })->add(new JWTAuthMiddleware());

            $group->group('/categories', function (RouteCollectorProxyInterface $group) use ($app) {
                $group->get('[/]', CategoryController::class.':getAllCategories');
                $group->post('[/]', CategoryController::class.':createCategory');
                $group->get('/{categoryId}[/]', CategoryController::class.':getSpecificCategory');
            })->add(new JWTAuthMiddleware());

            $group->group('/restaurants', function (RouteCollectorProxyInterface $group) use ($app) {
                $group->get('[/]', RestaurantController::class.':getAllRestaurants');
                $group->post('[/]', RestaurantController::class.':createRestaurant');
                $group->get('/{restaurantId}[/]', RestaurantController::class.':getSpecificRestaurant');
                $group->patch('/{restaurantId}[/]', RestaurantController::class.':updateRestaurant');
            })->add(new JWTAuthMiddleware());
            
            $group->group('/notification', function (RouteCollectorProxyInterface $group) use ($app) {
                $group->get('/token[/]', NotificationController::class.':getPublicToken');
                $group->post('/subscription[/]', NotificationController::class.':createSubscription');
            })->add(new JWTAuthMiddleware());

            $group->group('/process', function (RouteCollectorProxyInterface $group) use ($app) {
                $group->get('/close-bowls[/]', ProcessController::class.':closeBowls');
            });
        });

        $this->app = $app;
    }

    /**
     * Get an instance of the application.
     *
     * @return \Slim\App
     */
    public function get(): SlimApp
    {
        return $this->app;
    }
}
