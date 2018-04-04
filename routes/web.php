<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', 'HomeController@welcome');

// 获取token
Route::get('/api/token', 'Api\UtilsController@token');

Route::get('/api/auth', 'AuthController@auth');

Route::post('/login', 'Auth\LoginController@login');
Route::get('/logout', 'Auth\LoginController@logout');

//Auth::routes();
//
//Route::get('/home', 'HomeController@index')->name('home');
