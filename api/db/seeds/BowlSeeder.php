<?php

use Phinx\Seed\AbstractSeed;

class BowlSeeder extends AbstractSeed
{
    public function getDependencies()
    {
        return [
            'UserSeeder',
        ];
    }

    public function run()
    {
        $this->table('bowls')->truncate();
        $faker = Faker\Factory::create();
        $data = [];
        $userIds = $this->adapter->fetchAll('select id from users');
        for ($i = 0; $i < 20; $i++) {
            $data[] = [
                'creator_id'      => $userIds[array_rand($userIds)]['id'],
                'name'      => $faker->name,
                'description'      => $faker->text(200),
                'order_deadline'      => date('Y-m-d H:i:s'),
                'arrive_date'      => date('Y-m-d H:i:s'),
                'menu_id'      => $faker->randomDigit,
                'created'       => date('Y-m-d H:i:s'),
                'updated'       => date('Y-m-d H:i:s'),
            ];
        }

        $this->table('bowls')->insert($data)->saveData();
    }
}