<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsToArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('articles', function (Blueprint $table) {
            $prefix = config('database.default-prefix');

            $table->integer('category_id')->unsigned()->comment('分类id');

            if (config('app.debug')) {
                $table->foreign('category_id', $prefix . 'category_id_foreign')->references('id')->on('articles_categories');
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
        Schema::table('articles', function (Blueprint $table) {
            //
            $table->dropColumn('category_id');
        });
    }
}
