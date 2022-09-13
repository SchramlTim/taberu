<?php

use Phinx\Seed\AbstractSeed;

class CategorySeeder extends AbstractSeed
{
    public function run()
    {
        return;
        $this->table('categories')->truncate();
        $faker = Faker\Factory::create();
        $data = [];
        for ($i = 0; $i < 20; $i++) {
            $data[] = [
                'name' => $faker->hexColor,
                'icon_url' => $faker->url,
            ];
        }

        $this->table('categories')->insert($data)->saveData();
    }
}