<?php

namespace Taberu\Utils;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Log\LoggerInterface;
use Slim\App;
use Taberu\Exception\ResponseException;
use Slim\Interfaces\ErrorRendererInterface;
use Taberu\Transformer\Error;
use Throwable;

class JsonErrorHandler 
{
    private App $app;

    public function __construct(App $app)
    {
        $this->app = $app;
    }

    public function __invoke(
        ServerRequestInterface $request,
        Throwable $exception,
        bool $displayErrorDetails,
        bool $logErrors,
        bool $logErrorDetails,
        ?LoggerInterface $logger = null
    ): ResponseInterface
    {
        $statusCode = 500;
        if ($exception instanceof ResponseException) {
            $statusCode = $exception->getStatusCode();
        }

        $transformer = new Error($exception);
        $response = $this->app->getResponseFactory()->createResponse();
        $response->getBody()->write($transformer->getJson());
        return $response
                ->withStatus($statusCode)
                ->withHeader('Content-type', 'application/json');
    }
}