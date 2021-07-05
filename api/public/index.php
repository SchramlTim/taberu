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

    $app->group('/orders', function (RouteCollectorProxyInterface $group) use ($app) {
        $app->get('/{orderId}[/]', DeparmentController::class.':getSpecificOrder');
    })->add(new JsonTokenAuthentication());
});





$app->run();