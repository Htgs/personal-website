<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesTable extends Migration
{
    // php artisan make:migration create_articles_table --create=articles
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // 文章表
        Schema::create('articles', function (Blueprint $table) {
            $prefix = config('database.default-prefix');

            $table->increments('id');
            $table->integer('user_id')->unsigned()->comment('用户id');
            $table->string('title', 200)->comment('文章标题');  //文章标题
            $table->tinyInteger('is_public')->nullable()->default(1)->comment('是否公开'); //是否公开，0为不公开，1为公开，默认为1
            $table->text('content')->comment('文章内容');  //文章内容
            $table->dateTime('article_date')->comment('文章发表日期');  //文章发表日期
            $table->text('memo')->nullable()->comment('备注');  //备注
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
        Schema::dropIfExists('articles');
    }
}
