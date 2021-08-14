<?php

use Phinx\Seed\AbstractSeed;

class User2BowlSeeder extends AbstractSeed
{
    public function getDependencies()
    {
        return [
            'UserSeeder',
            'BowlSeeder',
        ];
    }

    public function run()
    {
        $this->table('user2bowl')->truncate();
        $data = [];
        $userIds = $this->adapter->fetchAll('select id from users');
        $bowlIds = $this->adapter->fetchAll('select id from bowls');

        foreach ($bowlIds as $bowlId) {
            for ($i = 0; $i < rand(1, 3); $i++) {
                $data[] = [
                    'bowl_id' => $bowlId['id'],
                    'user_id' => $userIds[array_rand($userIds)]['id'],
                ];
            }
        }

        $this->table('user2bowl')->insert($data)->saveData();
    }
}