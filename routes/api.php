<?php

use App\Http\Controllers\ChannelController;
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
Route::get('/api/subscribe/channelId/userId',[ChannelController::class,'getSubscribe']);
Route::post('/api/subscribe/channelId/userId',[ChannelController::class,'postSubscribe']);
Route::get('/api/like/channelId/userId',[ChannelController::class,'getLike']);
Route::post('/api/like/channelId/userId',[ChannelController::class,'postLike']);
Route::get('/api/dislike/channelId/userId',[ChannelController::class,'getdisLike']);
Route::post('/api/dislike/channelId/userId',[ChannelController::class,'postdisLike']);