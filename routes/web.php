<?php

use App\Http\Controllers\ChannelController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\VideoController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
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

Route::get('/',[VideoController::class,'index']);

Auth::routes();
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::post('search',[VideoController::class,'search'])->name('video.search');
Route::get('/videos',[VideoController::class,'index'])->name('video.index');

Route::prefix('video')->group(function(){
  Route::get('upload',[VideoController::class,'create'])->name('video.create');
  Route::post('upload',[VideoController::class,'store'])->name('video.store');
  Route::get('watch/{videoId}',[VideoController::class,'show'])->name('video.watch');
  Route::get('like',[VideoController::class,'getLike']);
  Route::post('like',[VideoController::class,'postLike']);
  Route::get('dislike/{videoId}/{userId}',[VideoController::class,'getDislike']);
  Route::post('dislike/{videoId}/{userId}',[VideoController::class,'postDislike']);
});
Route::prefix('comment')->group(function(){
  Route::post('create',[CommentController::class,'store'])->name('comment.store');
  Route::get('commentId/edit',[CommentController::class,'edit'])->name('comment.edit');
  Route::patch('update',[CommentController::class,'update'])->name('comment.update');
  Route::delete('delete',[CommentController::class,'deklete'])->name('comment.delete');
  Route::get('like/commentId/userId',[CommentController::class,'getLike']);
  Route::post('like/commentId/userId',[CommentController::class,'postLike']);
  Route::get('dislike/commentId/userId',[CommentController::class,'getDislike']);
  Route::post('dislike/commentId/userId',[CommentController::class,'postDislike']);
});
Route::prefix('channel')->group(function(){
  Route::get('create',[ChannelController::class,'create'])->name('channel.create');
  Route::post('create',[ChannelController::class,'store'])->name('channel.store');
  Route::get('show/{id}',[ChannelController::class,'show'])->name('channel.show');
  Route::get('subscribe',[ChannelController::class,'getSubscribe']);
  Route::post('subscribe',[ChannelController::class,'postSubscribe']);
});
