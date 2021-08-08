<?php

use Phinx\Seed\AbstractSeed;

class UserSeeder extends AbstractSeed
{
    public function run()
    {
        $this->table('users')->truncate();
        $faker = Faker\Factory::create();
        $data = [];
        for ($i = 0; $i < 20; $i++) {
            $data[] = [
                'username'      => $faker->email,
                'first_name'      => $faker->userName,
                'last_name'      => $faker->userName,
                'password'      => sha1($faker->password),
                'password_salt' => sha1('foo'),
                'phone_number'  => $faker->phoneNumber,
                'paypal_username'  => $faker->email,
                'created'       => date('Y-m-d H:i:s'),
                'updated'       => date('Y-m-d H:i:s'),
            ];
        }

        $this->table('users')->insert($data)->saveData();
    }
}