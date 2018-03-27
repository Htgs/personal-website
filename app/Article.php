<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    // 创建模型
    // php artisan make:model Article

    static $prefix = config('database.default-prefix');

    /**
     * 关联到模型的数据表
     *
     * @var string
     */
    protected $table = $prefix.'articles';

    /**
     * 可以被批量赋值的属性.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'title', 'is_public', 'content', 'article_date', 'memo'];
}
