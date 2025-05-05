<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
  return $request->user();
});

/* Public Routes */
Route::middleware(['api'])->group(function () {
  Route::post('/login', 'AuthController@login');
  Route::post('/loginGoogle', 'AuthController@loginWithGoogle');
  Route::post('/register', 'AuthController@register');
  Route::post('/forgotpassword', 'AuthController@forgotPassword');
  Route::post('/resetpassword', 'AuthController@resetPassword');
  Route::get('/auth/google/redirect', 'AuthController@redirectToProvider');
  Route::get('/auth/google/callback', 'AuthController@handleProviderCallback');
});

/* Private Routes */
Route::group(['middleware' => 'jwt.auth'], function () {
  Route::resource('nidos', 'NidoController');
  Route::resource('fotos', 'FotoController');
  Route::resource('ubicaciones', 'UbicacionController');
  Route::post('/logout', 'AuthController@logout');
  Route::put('/changepassword', 'AuthController@changePassword');
  Route::delete('/user', 'AuthController@delete');
  Route::put('/user', 'AuthController@update');
});
