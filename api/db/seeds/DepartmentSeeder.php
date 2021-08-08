<?php

use Phinx\Seed\AbstractSeed;

class DepartmentSeeder extends AbstractSeed
{
    public function run()
    {
        $this->table('departments')->truncate();
        $faker = Faker\Factory::create();
        $data = [];
        for ($i = 0; $i < 20; $i++) {
            $data[] = [
                'name'          => $faker->company,
                'description'   => $faker->randomLetter,
                'location'      => $faker->city,
                'created'       => date('Y-m-d H:i:s'),
                'updated'       => date('Y-m-d H:i:s'),
            ];
        }

        $this->table('departments')->insert($data)->saveData();
    }
}