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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/weather', 'WeatherController@showWeather');
Route::get('/api/orders', 'OrderController@index');
Route::get('/api/orders10', 'OrderController@index10');
Route::get('/api/order/{id}', 'OrderController@details');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
