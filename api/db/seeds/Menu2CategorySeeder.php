<?php

use Phinx\Seed\AbstractSeed;

class Menu2CategorySeeder extends AbstractSeed
{
    public function getDependencies()
    {
        return [
            'MenuSeeder',
            'CategorySeeder',
        ];
    }

    public function run()
    {
        $this->table('menu2category')->truncate();
        $faker = Faker\Factory::create();
        $data = [];
        $menuIds = $this->adapter->fetchAll('select id from menus');
        $categoryIds = $this->adapter->fetchAll('select id from categories');

        foreach ($menuIds as $menuId) {
            for ($i = 0; $i < rand(1, 3); $i++) {
                $data[] = [
                    'menu_id' => $menuId['id'],
                    'category_id' => $categoryIds[array_rand($categoryIds)]['id'],
                ];
            }
        }

        $this->table('menu2category')->insert($data)->saveData();
    }
}