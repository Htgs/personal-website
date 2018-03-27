<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     * 可以被批量赋值的属性
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'niname', 'avatar', 'realname', 'gender', 'birth_date', 'login_time', 'ip', 'phone', 'memo'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
