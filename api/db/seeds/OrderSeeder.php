<?php

use Phinx\Seed\AbstractSeed;

class OrderSeeder extends AbstractSeed
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
        $this->table('orders')->truncate();
        $faker = Faker\Factory::create();
        $data = [];
        $bowlIds = $this->adapter->fetchAll('select id from bowls');
        $userIds = $this->adapter->fetchAll('select id from users');
        for ($i = 0; $i < 50; $i++) {
            $data[] = [
                'bowl_id' => $bowlIds[array_rand($bowlIds)]['id'],
                'user_id' => $userIds[array_rand($userIds)]['id'],
                'final_price' => $faker->randomFloat(2, 1, 100),
                'payment_method' => $faker->creditCardType,
                'payment_status' => $faker->randomElement(['NOT_PAID', 'PAID']),
                'order_status' => $faker->randomElement(['OPEN', 'ORDERED', 'ARRIVED']),
                'created'       => date('Y-m-d H:i:s'),
                'updated'       => date('Y-m-d H:i:s'),
            ];
        }

        $this->table('orders')->insert($data)->saveData();
    }
}