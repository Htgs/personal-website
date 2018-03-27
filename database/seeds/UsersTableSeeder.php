<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@qq.com',
            'password' => bcrypt('123456'),
            'niname' => 'niko',
            'realname' => '尼克',
            'gender' => 0,
            'login_time' => date("Y-m-d h:i:s", time()),
            'ip' =>  '127.0.0.1',
        ]);
    }
}
