<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateResumeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // 简历表
        // 简历名称
        // 个人信息
        // 求职意向
        // 教育背景
        // 工作经历
        // 项目经验
        // 自我评价
        Schema::create('resumes', function (Blueprint $table) {
            $prefix = config('database.default-prefix');

            $table->increments('id');
            $table->integer('user_id')->unsigned()->comment('用户id');
            $table->string('title', 50)->comment('简历名称');  //简历名称
            $table->string('forward_to_job', 50)->nullable()->comment('求职意向');  //求职意向
            $table->text('education')->nullable()->comment('教育背景'); //教育背景
            $table->text('work')->comment('工作经历');  //工作经历 使用json格式字符串
            $table->text('project')->comment('项目经验');  //项目经验 使用json格式字符串
            $table->text('introduction')->comment('自我评价');  //自我评价
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
        Schema::dropIfExists('resumes');
    }
}
