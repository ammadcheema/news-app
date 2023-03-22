<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\NewsController;
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

Route::post('/register', [AuthController::class, 'register'])->name('user.register');
Route::post('/login',    [AuthController::class, 'login'])->name('user.login');

/**
 * protected routes
 */

Route::middleware('auth:api')->group(function () {
    Route::match(['put', 'patch'], '/profile', [AuthController::class, 'updateProfile'])->name('user.updateProfile');

    Route::prefix('news')->group(function() {
        Route::get('sources',      [NewsController::class, 'getSources'])->name('news.getSources');
        Route::get('preferences',  [NewsController::class, 'getPreferences'])->name('news.getPreferences');
        Route::get('topHeadlines', [NewsController::class, 'getTopHeadlines'])->name('news.getTopHeadlines');
        Route::get('everything',   [NewsController::class, 'getEverything'])->name('news.getEverything');
    });
});
