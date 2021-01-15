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
Route::get('/api/ordersSortBack', 'OrderController@sortBack');
Route::get('/api/ordersMore', 'OrderController@loadMore');
Route::get('/api/ordersLess', 'OrderController@loadLess');
Route::get('/api/order/{id}', 'OrderController@details');

Route::get('/api/products', 'ProductController@index');

Route::post('/api/order/{id}', 'OrderController@update');
Route::post('/api/partner/{id}', 'PartnerController@update');
Route::post('/api/order_products/{id}', 'OrderProductsController@update');
Route::post('/api/addNewProduct', 'OrderProductsController@addNewProduct');
Route::post('/api/deleteItem/{id}', 'OrderProductsController@deleteProduct');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
