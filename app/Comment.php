<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    // 创建模型
    // php artisan make:model Comment

//    $prefix = config('database.default-prefix');

    /**
     * 关联到模型的数据表
     *
     * @var string
     */
//    protected $table = $prefix.'comments';

    /**
     * 可以被批量赋值的属性.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'article_id', 'content', 'comment_date', 'memo'];
}
