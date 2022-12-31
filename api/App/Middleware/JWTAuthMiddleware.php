<?php

namespace Taberu\Middleware;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response;
use Taberu\Model\User;
use Taberu\Validator\JWT;

class JWTAuthMiddleware
{
    /**
     * Example middleware invokable class
     *
     * @param  ServerRequest  $request PSR-7 request
     * @param  RequestHandler $handler PSR-15 request handler
     *
     * @return Response
     */
    public function __invoke(Request $request, RequestHandler $handler): Response
    {
        $token = null;
        $lowerHeaders = array_change_key_case($request->getHeaders());
        if (array_key_exists('x-token', $lowerHeaders)) {
            $token = $lowerHeaders['x-token'][0];
        }

        if (!$token) {
            $response = new Response();
            return $response->withStatus(401);
        }
             
        $validator = new JWT($token);
        if (!$validator->validate()) {
            $response = new Response();
            return $response->withStatus(401);
        }

        $users = User::all([
            [User::ID, '=', $validator->getPayload()['sub']]
        ]);

        if (!count($users)) {
            $response = new Response();
            return $response->withStatus(401);
        }

        $request = $request->withQueryParams(array_merge($request->getQueryParams(), $validator->getPayload()));
        return $handler->handle($request);
    }
}
