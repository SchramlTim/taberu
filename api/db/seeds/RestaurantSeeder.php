<?php

use Phinx\Seed\AbstractSeed;

class RestaurantSeeder extends AbstractSeed
{
    public function getDependencies()
    {
        return [];
    }

    public function run()
    {
        $this->table('restaurants')->truncate();
        $faker = Faker\Factory::create();
        $data = [];
        for ($i = 0; $i < 20; $i++) {
            $data[] = [
                'name'      => $faker->name,
                'street'      => $faker->streetName,
                'street_nr'      => $faker->randomDigit,
                'zip'      => $faker->numerify('#####'),
                'city'      => $faker->city,
                'description'      => $faker->randomLetter,
                'phone_number'      => $faker->phoneNumber,
                'created'       => date('Y-m-d H:i:s'),
                'updated'       => date('Y-m-d H:i:s'),
            ];
        }

        $this->table('restaurants')->insert($data)->saveData();
    }
}