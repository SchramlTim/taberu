<?php

use Phinx\Seed\AbstractSeed;

class CategorySeeder extends AbstractSeed
{
    public function run()
    {
        $this->table('categories')->truncate();
        $faker = Faker\Factory::create();
        $data = [];
        for ($i = 0; $i < 20; $i++) {
            $data[] = [
                'name' => $faker->hexColor,
            ];
        }

        $this->table('categories')->insert($data)->saveData();
    }
}