<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    // 创建模型
    // php artisan make:model Article
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
    protected $fillable = ['user_id', 'title', 'is_public', 'content', 'article_date', 'memo'];
    
    public function articleCategory() {
        return $this->belongsTo('App\ArticleCategory', 'category_id', 'id');
    }

    public function user() {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
    
    public function comments() {
        return $this->hasMany('App\Comment', 'article_id', 'id');
    }
}
