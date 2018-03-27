<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // 添加填充器
        // php artisan make:seeder UsersTableSeeder
        // 更新填充器配置
        // composer dump-autoload
        // 数据填充
        // php artisan db:seed
        // php artisan db:seed --class=UsersTableSeeder
        // 数据回滚
        // php artisan migrate:refresh --seed

        // 引用其他填充器
    	// $this->call(UsersTableSeeder::class);
    	if (config('app.debug')) {
        	$this->call(UsersTableSeeder::class);
        } else {
        }
    }
}
