<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReplyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // 回复
        Schema::create('replies', function (Blueprint $table) {
            $prefix = config('database.default-prefix');

            $table->increments('id');
            $table->integer('user_id')->unsigned()->comment('用户id');
            $table->integer('comment_id')->unsigned()->comment('评论id');
            $table->string('content', 200)->comment('回复内容');  //回复内容
            $table->dateTime('reply_date')->comment('回复时间');  //回复时间
            $table->text('memo')->nullable()->comment('备注');  //备注
            $table->softDeletes();  //deleted_at
            $table->timestamps();

            if (config('app.debug')) {
                $table->foreign('user_id', $prefix . 'user_id_foreign')->references('id')->on('users');
                $table->foreign('comment_id', $prefix . 'comment_id_foreign')->references('id')->on('comments');
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
        Schema::dropIfExists('replies');
    }
}
