<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    // 创建模型
    // php artisan make:model Reply

//    $prefix = config('database.default-prefix');

    /**
     * 关联到模型的数据表
     *
     * @var string
     */
//    protected $table = $prefix.'replies';

    /**
     * 可以被批量赋值的属性.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'comment_id', 'content', 'reply_date', 'memo'];
}
