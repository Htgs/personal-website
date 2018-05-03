<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reply extends Model
{
    // 创建模型
    // php artisan make:model Reply
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
    protected $fillable = ['user_id', 'comment_id', 'content', 'reply_date', 'memo'];
    
    public function user() {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
    
    public function comment() {
        return $this->belongsTo('App\Comment', 'comment_id', 'id');
    }
}
