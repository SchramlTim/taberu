<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Taberu\Middleware\JsonTokenChecker;
use Taberu\Middleware\Cors;
use Taberu\Controller\DefaultController;


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

$app->get('/clothing[/]', DefaultController::class.':addEntry')->add(new JsonTokenChecker());

$app->post('/user/register[/]', UserController::class.':register');
$app->post('/user/login[/]', UserController::class.':login');
$app->post('/user/logout[/]', UserController::class.':logout');

$app->run();