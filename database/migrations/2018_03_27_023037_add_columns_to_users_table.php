<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsToUsersTable extends Migration
{
    // 使用命令行
    // php artisan make:migration add_columns_to_users_table --table=users
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('niname', 50)->default('user')->comment('昵称');  //昵称
            $table->string('avatar', 200)->nullable()->comment('头像');  //头像
            $table->string('realname')->nullable()->comment('真是姓名'); //真是姓名
            $table->tinyInteger('gender')->default(0)->comment('性别'); //性别，0为男性，1为女性，默认为0
            $table->string('birth_date', 50)->nullable()->comment('出生日期');  //出生日期
            $table->string('phone', 50)->nullable()->comment('手机号码');  //手机号码
            $table->text('memo')->nullable()->comment('备注');  //备注
            $table->softDeletes();  //deleted_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
            // $prefix = config('database.default-prefix');

            // if (config('app.debug')) {
            //     $table->dropForeign($prefix . 'users_company_id_foreign');
            // }

            $table->dropColumn('deleted_at');
            $table->dropColumn('memo');
            $table->dropColumn('phone');
            $table->dropColumn('birth_date');
            $table->dropColumn('gender');
            $table->dropColumn('niname');
        });
    }
}
