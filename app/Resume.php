<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Resume extends Model
{
    // 创建模型
    // php artisan make:model Article

    $prefix = config('database.default-prefix');

    /**
     * 关联到模型的数据表
     *
     * @var string
     */
    protected $table = $prefix.'resumes';

    /**
     * 可以被批量赋值的属性.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'title', 'forward_to_job', 'education', 'work', 'project', 'introduction', 'memo'];
}
