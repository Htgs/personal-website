<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// 获取token
Route::get('/token', 'HomeController@Token');

Route::group(['namespace' => 'Api', 'middleware' => ['auth:api']], function () {
    Route::resource('/user', 'UsersController');
    // Route::get('users', function () {
    //     // Matches The "/admin/users" URL
    // });
});
