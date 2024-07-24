<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UrlController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'auth'], function () {
    Route::post("login", [AuthController::class, "login"])->name('login');
    Route::post('register', [AuthController::class, 'register'])->name('register');
});

Route::group([
    'middleware' => ['checkLogin'],
    'prefix' => 'auth'
], function () {
    Route::post("create", [UrlController::class, "createUrl"]);
  
    Route::post("update/{code}", [UrlController::class, "updateUrl"]);
    Route::delete("delete/{id}", [UrlController::class, "deleteUrl"]);
    Route::post("logout", [AuthController::class, "logout"])->name('logout');
    Route::get("me", [AuthController::class, "getUserProfile"]);
    Route::get('list', [UrlController::class, "getUrlByUser"]);
});
Route::get("find/{code}", [UrlController::class, "findShortLink"]);
