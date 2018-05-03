<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ArticleCategory extends Model
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
    protected $fillable = ['pid', 'name', 'memo'];
    
    public function parentCategory() {
        return $this->hasMany('App\ArticleCategory', 'pid', 'id');
    }
    
    public function subCategories() {
        return $this->belongsTo('App\ArticleCategory', 'pid', 'id');
    }
    
    public function articles() {
        return $this->hasMany('App\Article', 'category_id', 'id');
    }
}
