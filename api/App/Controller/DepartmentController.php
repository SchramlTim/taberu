<?php

namespace Taberu\Controller;

use Taberu\Exception\ResponseException;
use Taberu\Model\Department;
use Taberu\Transformer\DepartmentList;
use Taberu\Utils\Database;
use Taberu\Validator\JWT;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\StreamInterface;
use Slim\Psr7\Cookies;
use Slim\Psr7\UploadedFile;

class DepartmentController
{
    public function getAllDepartments(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $departments = Department::all();
            $transformer = new DepartmentList($departments);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function createDepartment(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $parsedBody = $request->getParsedBody();

        try {
            $department = new Department();
            $department->setName($parsedBody['name'])
                ->setDescription($parsedBody['description'])
                ->setLocation($parsedBody['location']);
            $department->create();

            $department = Department::findFirstOrFail([
                [Department::ID, '=', $department->getId()]
            ]);

            $transformer = new \Taberu\Transformer\Department($department);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\AlreadyExistException $e) {
            throw new ResponseException(409, $e->getMessage());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function getSpecificDepartment(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $department = Department::findFirstOrFail([
                [Department::ID, '=', (int)$args['departmentId']]
            ]);

            $transformer = new \Taberu\Transformer\Department($department);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\AlreadyExistException $e) {
            throw new ResponseException(404, $e->getMessage());
        } catch (\Taberu\Exception\MultipleEntriesFoundException $e) {
            throw new ResponseException(400, $e->getMessage());
        }

        return $response;
    }

    public function updateDepartment(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $parsedBody = $request->getParsedBody();

        try {
            $department = Department::findFirstOrFail([
                [Department::ID, '=', (int)$args['departmentId']]
            ]);

            if (isset($parsedBody['name'])) {
                $department->setName($parsedBody['name']);
            }
            if (isset($parsedBody['description'])) {
                $department->setDescription($parsedBody['description']);
            }
            if (isset($parsedBody['location'])) {
                $department->setLocation($parsedBody['location']);
            }

            $department->update();

            $transformer = new \Taberu\Transformer\Department($department);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(409, $e->getMessage());
        }

        return $response;
    }

    public function deleteDepartment(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write("Function " . __FUNCTION__ . " is not implemented");
        return $response;
    }

    public function getAllDepartmentUser(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write("Function " . __FUNCTION__ . " is not implemented");
        return $response;
    }
}
