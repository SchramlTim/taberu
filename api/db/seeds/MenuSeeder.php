<?php

use Phinx\Seed\AbstractSeed;

class MenuSeeder extends AbstractSeed
{
    public function getDependencies()
    {
        return [
            'UserSeeder',
            'RestaurantSeeder',
        ];
    }

    public function run()
    {
        $this->table('menus')->truncate();
        $faker = Faker\Factory::create();
        $data = [];
        $userIds = $this->adapter->fetchAll('select id from users');
        $restaurantIds = $this->adapter->fetchAll('select id from restaurants');

        for ($i = 0; $i < 20; $i++) {
            $data[] = [
                'name'      => $faker->name,
                'description'      => $faker->randomLetter,
                'creator_id'      => $userIds[array_rand($userIds)]['id'],
                'restaurant_id'      => $restaurantIds[array_rand($restaurantIds)]['id'],
                'created'       => date('Y-m-d H:i:s'),
                'updated'       => date('Y-m-d H:i:s'),
            ];
        }

        $this->table('menus')->insert($data)->saveData();
    }
}