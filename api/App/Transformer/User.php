<?php

namespace Taberu\Transformer;

use Taberu\Model\User as ModelUser;

class User extends JsonTransformer
{  
    private ModelUser $user;

    public function __construct(ModelUser $user)
    {
        $this->user = $user;
    }

    protected function transformData(): array
    {
        $data = [
            'self' => $this->user->getLink(),
            'username' => $this->user->getUsername(),
            'firstName' => $this->user->getFirstName(),
            'lastName' => $this->user->getLastName(),
            'phoneNumber' => $this->user->getPhoneNumber(),
            'paypalUsername' => $this->user->getPaypalUsername(),
        ];

        return $data;
    }
}