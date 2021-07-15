<?php

namespace Taberu\Utils;

class JsonErrorHandler
{
    public function __invoke($request, $response, $exception) {
        return $response
            ->withStatus(500)
            ->withHeader('Content-Type', 'text/html')
            ->write('Something went wrong!');
   }
}