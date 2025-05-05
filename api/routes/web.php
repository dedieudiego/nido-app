<?php

use Illuminate\Support\Facades\Route;

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
  if (empty(Auth::user())) {
    return view('login');
  } else {
    if (Auth::user()->hasAnyRole(['administrator', 'manager']))
      return redirect('/dashboard');
    else
      return redirect('/index');
  }
});

/* Web Routes LogIn */
Route::get('/login', 'Backend\LoginController@index');
Route::post('/login', 'Backend\LoginController@login')->name('login');
Route::post('/logout', 'Backend\LoginController@logout')->name('logout');

Route::get('/recovery', 'Backend\LoginController@recovery');
Route::post('/recoverypass', 'Backend\LoginController@recoverypass');
Route::get('/confirmation/{token}', 'Backend\LoginController@confirmation');
Route::post('/pass/confirmation', 'Backend\LoginController@confirmationpass');
Route::get('/pass/confirmation', function () {
  return redirect('/login');
});
Route::get('/signup', 'Backend\AccountController@signup')->name('signup');
Route::post('/signup/store', 'Backend\AccountController@store')->name('signup.store');


/* Auth Roles */
Route::group(['middleware' => 'auth'], function () {

  /* ROLE: Admin */
  Route::group(['middleware' => ['checkrole:administrator|manager']], function () {
    Route::get('/accounts', 'Backend\AccountController@index')->name('accounts.index');
    Route::get('/accounts/edit/{id}', 'Backend\AccountController@edit')->name('accounts.edit');
    Route::post('/accounts/update', 'Backend\AccountController@updateAccount')->name('accounts.update');
  });

  /* ROLE: Admin + Manager*/
  Route::group(['middleware' => ['checkrole:administrator|manager']], function () {
    //TODO >> HABRÍA QUE CREAR UN DASHBOARD NUEVO QUE MUESTRE COMO EN GEOVIN LOS REPORTES, PERO CON 
    //LAS COLUMNAS QUE TIENE LA TABLA NIDOS
  });

  /* ROLE: User */
  Route::group(['middleware' => ['checkrole:customer']], function () {
    Route::get('/index', 'Backend\LoginController@index')->name('online.index');
  });

  /* SHARED */
  Route::group(['middleware' => ['checkrole:administrator|customer|manager']], function () {
    Route::get('/account/profile', 'Backend\AccountController@profile')->name('account.profile');
    Route::post('/account/update', 'Backend\AccountController@update')->name('account.update');
    Route::get('/account/update', function () {
      return redirect('/account/profile');
    });
  });
});
