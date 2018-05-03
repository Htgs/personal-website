<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, SoftDeletes;
    /**
     * 应该被调整为日期的属性
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
    /**
     * The attributes that are mass assignable.
     * 可以被批量赋值的属性
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'niname', 'avatar', 'realname', 'gender', 'birth_date', 'phone', 'memo'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function articles(){
        return $this->hasMany('App\Article', 'article_id', 'id');
    }
    
    public function resumes(){
        return $this->hasMany('App\Resume', 'resume_id', 'id');
    }
    
    public function comments(){
        return $this->hasMany('App\Comment', 'user_id', 'id');
    }
    
    public function replies(){
        return $this->hasMany('App\Reply', 'user_id', 'id');
    }
}
