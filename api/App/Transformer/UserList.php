<?php

namespace Taberu\Transformer;

use Taberu\Model\User as ModelUser;

class UserList extends JsonTransformer
{  
    private array $users;

    public function __construct(array $users)
    {
        $this->users = $users;
    }

    protected function transformData(): array
    {
        $dataList = [];
        foreach ($this->users as $user) {
            $transformer = new User($user);
            $dataList[] = $transformer->getArray(false);
        }       

        return $dataList;
    }
}