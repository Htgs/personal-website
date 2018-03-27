<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // 评论表
        Schema::create('comments', function (Blueprint $table) {
            $prefix = config('database.default-prefix');

            $table->increments('id');
            $table->integer('user_id')->unsigned()->comment('用户id');
            $table->integer('article_id')->unsigned()->comment('文章id');
            $table->string('content', 200)->comment('评论内容');  //评论内容
            $table->dateTime('comment_date')->comment('评论时间');  //评论时间
            $table->text('memo')->nullable()->comment('备注');  //备注
            $table->softDeletes();  //deleted_at
            $table->timestamps();

            if (config('app.debug')) {
                $table->foreign('user_id', $prefix . 'user_id_foreign')->references('id')->on('users');
                $table->foreign('article_id', $prefix . 'article_id_foreign')->references('id')->on('articles');
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
        Schema::dropIfExists('comments');
    }
}
