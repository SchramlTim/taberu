<?php

namespace Taberu\Transformer;

use Taberu\Exception\ResponseException;
use Throwable;

class Error extends JsonTransformer
{  
    private Throwable $error;

    public function __construct(Throwable $error)
    {
        $this->error = $error;
    }

    protected function transformData(): array
    {
        $statusCode = 500;
        if ($this->error instanceof ResponseException) {
            $statusCode = $this->error->getStatusCode();
        }

        return [
            'code' => $statusCode,
            'message' => $this->error->getMessage(),
        ];
    }
}