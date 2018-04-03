<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('logs', function (Blueprint $table) {
            $prefix = config('database.default-prefix');

            $table->increments('id');
            $table->integer('user_id')->unsigned()->comment('用户id');
            $table->string('model')->comment('模块');  //模块
            $table->string('type')->comment('操作类型');  //操作类型
            $table->string('content')->comment('内容');  //内容
            $table->dateTime('log_date')->comment('记录时间');  //记录时间
            $table->string('ip', 50)->comment('ip地址');  //ip地址
            $table->softDeletes();  //deleted_at
            $table->timestamps();

            if (config('app.debug')) {
                $table->foreign('user_id', $prefix . 'user_id_foreign')->references('id')->on('users');
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('logs');
    }
}
