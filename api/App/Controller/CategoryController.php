<?php

namespace Taberu\Controller;

use Taberu\Exception\ResponseException;
use Taberu\Model\Category;
use Taberu\Transformer\CategoryList;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class CategoryController
{

    public function getAllCategories(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $categories = Category::all();
            $transformer = new CategoryList($categories);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function createCategory(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $parsedBody = $request->getParsedBody();

        try {
            $category = new Category();
            $category->setName($parsedBody['name']);
            $category->create();

            $category = Category::findFirstOrFail([
                [Category::ID, '=', $category->getId()]
            ]);

            $transformer = new \Taberu\Transformer\Category($category);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\AlreadyExistException $e) {
            throw new ResponseException(409, $e->getMessage());
        } catch (\Taberu\Exception\NotFoundException $e) {
            throw new ResponseException(404, $e->getMessage());
        }

        return $response;
    }

    public function getSpecificCategory(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $category = Category::findFirstOrFail([
                [Category::ID, '=', (int)$args['categoryId']]
            ]);

            $transformer = new \Taberu\Transformer\Category($category);
            $response->getBody()->write($transformer->getJson());
        } catch (\Taberu\Exception\AlreadyExistException $e) {
            throw new ResponseException(404, $e->getMessage());
        } catch (\Taberu\Exception\MultipleEntriesFoundException $e) {
            throw new ResponseException(400, $e->getMessage());
        }

        return $response;
    }
}
