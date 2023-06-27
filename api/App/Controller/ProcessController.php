<?php

namespace Taberu\Controller;

use Taberu\Exception\ResponseException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Taberu\Model\Bowl;

class ProcessController 
{
    public function closeBowls(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
          $bowls = Bowl::all();

          foreach ($bowls as $bowl) {
            $bufferTime = $bowl->getOrderDeadline()->modify('+5 minutes');
            if ($bufferTime <= new \DateTime() && $bowl->getStatus() === 'OPEN') {
              $bowl->setStatus('CLOSED');
              $bowl->update();
            }
          }
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }
}
