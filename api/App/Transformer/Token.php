<?php

namespace Taberu\Transformer;

use Taberu\Model\User as ModelUser;

class Token extends JsonTransformer
{  
    private string $token;

    public function __construct(string $token)
    {
        $this->token = $token;
    }

    protected function transformData(): array
    {
        $data = [
            'token' => $this->token
        ];

        return $data;
    }
}