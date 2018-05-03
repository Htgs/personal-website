<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    // 创建模型
    // php artisan make:model Comment
    use SoftDeletes;
    /**
     * 应该被调整为日期的属性
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
    /**
     * 可以被批量赋值的属性.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'article_id', 'content', 'comment_date', 'memo'];

    public function user() {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }

    public function article() {
        return $this->belongsTo('App\Article', 'article_id', 'id');
    }

    public function replies() {
        return $this->hasMany('App\Reply', 'comment_id', 'id');
    }
}
