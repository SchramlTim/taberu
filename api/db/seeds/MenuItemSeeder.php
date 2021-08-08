<?php

use Phinx\Seed\AbstractSeed;

class MenuItemSeeder extends AbstractSeed
{
    public function getDependencies()
    {
        return [
            'MenuSeeder'
        ];
    }

    public function run()
    {
        $this->table('menu_items')->truncate();
        $faker = Faker\Factory::create();
        $data = [];
        $menuItemIds = $this->adapter->fetchAll('select id from menus');
        foreach($menuItemIds as $menuid) {
            for ($i = 0; $i < rand(1, 10); $i++) {
                $data[] = [
                    'menu_id'     => $menuid['id'],
                    'name'        => $faker->colorName,
                    'description' => $faker->randomLetter,
                    'price'       => $faker->randomFloat(2, 0, 100),
                    'created'     => date('Y-m-d H:i:s'),
                    'updated'     => date('Y-m-d H:i:s'),
                ];
            }
        }

        $this->table('menu_items')->insert($data)->saveData();
    }
}