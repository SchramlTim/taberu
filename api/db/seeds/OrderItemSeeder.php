<?php

use Phinx\Seed\AbstractSeed;

class OrderItemSeeder extends AbstractSeed
{
    public function getDependencies()
    {
        return [
            'OrderSeeder',
        ];
    }

    public function run()
    {
        $this->table('order_items')->truncate();
        $faker = Faker\Factory::create();
        $data = [];
        $orderIds = $this->adapter->fetchAll('select id from orders');

        foreach ($orderIds as $orderId) {
            for ($i = 0; $i < rand(1, 3); $i++) {
                $data[] = [
                    'order_id' => $orderId['id'],
                    'name' => $faker->colorName,
                    'price' => $faker->randomFloat(2, 1, 100),
                    'count' => $faker->randomDigit,
                    'additional_information' => $faker->randomLetter,
                    'created'     => date('Y-m-d H:i:s'),
                    'updated'     => date('Y-m-d H:i:s'),
                ];
            }
        }

        $this->table('order_items')->insert($data)->saveData();
    }
}