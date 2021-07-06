<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Interfaces\RouteCollectorProxyInterface;
use Taberu\Middleware\Cors;
use Taberu\Middleware\JsonTokenAuthentication;
use Taberu\Controller\DefaultController;
use Taberu\Controller\UserController;


require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app->addBodyParsingMiddleware();
$app->add(new Cors());

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->get('[/]', function (Request $request, Response $response, array $args) {
    $response->getBody()->write("Nothing here");
    return $response;
});



$app->group('/v1', function (RouteCollectorProxyInterface $group) use ($app) {
    $app->group('/users', function (RouteCollectorProxyInterface $group) use ($app) {
        $app->post('/register[/]', UserController::class.':register');
        $app->post('/login[/]', UserController::class.':login');
        $app->post('/logout[/]', UserController::class.':logout')->add(new JsonTokenAuthentication());

        $app->get('/{userId}[/]', UserController::class.':getSpecificUser')->add(new JsonTokenAuthentication());
        $app->patch('/{userId}[/]', UserController::class.':updateUser')->add(new JsonTokenAuthentication());
        $app->get('[/]', UserController::class.':getAllUsers')->add(new JsonTokenAuthentication());
        $app->get('/{userId}/orders[/]', UserController::class.':getUserOrders')->add(new JsonTokenAuthentication());
        $app->get('/{userId}/menus[/]', UserController::class.':getUserMenus')->add(new JsonTokenAuthentication());
    });

    $app->group('/departments', function (RouteCollectorProxyInterface $group) use ($app) {
        $app->get('[/]', DeparmentController::class.':getAllDepartments');
        $app->post('[/]', DeparmentController::class.':createDepartment');
        $app->get('/{departmentId}[/]', DeparmentController::class.':getSpecificDepartment');
        $app->patch('/{departmentId}[/]', DeparmentController::class.':updateDepartment');
        $app->delete('/{departmentId}[/]', DeparmentController::class.':deleteDepartment');
        $app->delete('/{departmentId}/users[/]', DeparmentController::class.':getAllDepartmentUser');
    })->add(new JsonTokenAuthentication());

    $app->group('/bowls', function (RouteCollectorProxyInterface $group) use ($app) {
        $app->get('[/]', BowlsController::class.':getAllBowls');
        $app->post('[/]', BowlsController::class.':createBowl');
        $app->get('/{bowlId}[/]', BowlsController::class.':getSpecificBowl');
        $app->patch('/{bowlId}[/]', BowlsController::class.':updateBowl');
        $app->delete('/{bowlId}[/]', BowlsController::class.':deleteBowl');

        $app->get('/{bowlId}/orders[/]', BowlsController::class.':getAllBowlOrders');
        $app->post('/{bowlId}/orders[/]', BowlsController::class.':createBowlOrder');
        $app->patch('/{bowlId}/orders/{orderId}[/]', BowlsController::class.':updateBowlOrder');
        $app->delete('/{bowlId}/orders/{orderId}[/]', BowlsController::class.':deleteBowlOrder');

        $app->get('/{bowlId}/users[/]', BowlsController::class.':getAllBowlUser');
        $app->post('/{bowlId}/users[/]', BowlsController::class.':addBowlUser');
        $app->delete('/{bowlId}/users/{userId}[/]', BowlsController::class.':deleteBowlUser');
        
    })->add(new JsonTokenAuthentication());

    $app->group('/orders', function (RouteCollectorProxyInterface $group) use ($app) {
        $app->get('/{orderId}[/]', DeparmentController::class.':getSpecificOrder');
    })->add(new JsonTokenAuthentication());

    $app->group('/menus', function (RouteCollectorProxyInterface $group) use ($app) {
        $app->get('[/]', MenuController::class.':getAllMenus');
        $app->post('[/]', MenuController::class.':createMenu');
        $app->get('/{menuId}[/]', MenuController::class.':getSpecificMenu');
        $app->patch('/{menuId}[/]', MenuController::class.':updateMenu');
        $app->delete('/{menuId}[/]', MenuController::class.':deleteMenu');
        $app->get('/{menuId}/items[/]', MenuController::class.':getAllMenuItems');
        $app->post('/{menuId}/items[/]', MenuController::class.':createMenuItem');
        $app->post('/{menuId}/items/{itemId}[/]', MenuController::class.':updateMenuItem');
        $app->delete('/{menuId}/items/{itemId}[/]', MenuController::class.':deleteMenuItem');
    })->add(new JsonTokenAuthentication());

    $app->group('/categories', function (RouteCollectorProxyInterface $group) use ($app) {
        $app->get('[/]', CategoryController::class.':getAllCategories');
        $app->post('[/]', CategoryController::class.':createCategory');
        $app->get('/{categoryId}[/]', CategoryController::class.':getSpecificCategory');
    })->add(new JsonTokenAuthentication());

    $app->group('/restaurants', function (RouteCollectorProxyInterface $group) use ($app) {
        $app->get('[/]', RestaurantController::class.':getAllRestaurants');
        $app->post('[/]', RestaurantController::class.':createRestaurant');
        $app->get('/{restaurantId}[/]', RestaurantController::class.':getSpecificRestaurant');
        $app->patch('/{restaurantId}[/]', RestaurantController::class.':updateRestaurant');
    })->add(new JsonTokenAuthentication());
});



$app->run();