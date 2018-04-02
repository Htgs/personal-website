<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles_categories', function (Blueprint $table) {
            $prefix = config('database.default-prefix');

            $table->increments('id');
            $table->integer('pid')->unsigned()->comment('父id');
            $table->string('name', 30)->comment('分类名称');  //文章分类名称
            $table->text('memo')->nullable()->comment('备注');  //备注
            $table->softDeletes();  //deleted_at
            $table->timestamps();

            if (config('app.debug')) {
                $table->foreign('pid', $prefix . 'pid_foreign')->references('id')->on('articles_categories');
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
        Schema::dropIfExists('articles_categories');
    }
}
