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

// Route::get('/', function () {
//     return view('welcome');
// });

// Auth::routes();
// Route::get('/{path?}', 'HomeController@index')->name('home');
// Route::get('/{path?}/{pathd?}', 'HomeController@index')->name('home');

// Route::view('/', 'home');





// Route::group(['middleware' => 'auth:api'], function() {
//     Route::view('/', 'welcome');

// });

Auth::routes();
Route::group([
    'domain' => 'pulsespace.test',
], function () {
    Route::get('/{path?}', 'HomeController@index')->name('home');
    Route::get('/{path?}/{pathd?}', 'HomeController@index')->name('home');
});

Route::group([
    'domain' => 'myshop.' . 'pulsespace.test',
], function () {
    Route::get('/{path?}', 'DashboardController@index')->name('dashboard');
});
