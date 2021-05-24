<?php

use App\Http\Controllers\ChannelController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\VideoController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
  Route::get('comments',[VideoController::class,'comments']);
});
Route::prefix('comment')->group(function(){
  Route::post('store',[CommentController::class,'store'])->name('comment.store');
  Route::patch('update',[CommentController::class,'update'])->name('comment.update');
  Route::delete('delete',[CommentController::class,'destroy'])->name('comment.delete');
  Route::get('like',[CommentController::class,'getLike']);
  Route::post('like',[CommentController::class,'postLike']);
});
Route::prefix('channel')->group(function(){
  Route::get('{channel}/edit',[ChannelController::class,'edit'])->name('channel.edit')->middleware('can:update,channel');
  Route::patch('/update',[ChannelController::class,'update'])->name('channel.update');
  Route::get('create',[ChannelController::class,'create'])->name('channel.create');
  Route::post('update',[ChannelController::class,'store'])->name('channel.store');
  Route::get('show/{id}',[ChannelController::class,'show'])->name('channel.show');
  Route::delete('{channel}/delete/',[ChannelController::class,'delete'])->name('channel.delete');
  Route::get('subscribe',[ChannelController::class,'getSubscribe']);
  Route::post('subscribe',[ChannelController::class,'postSubscribe']);
  Route::get('{id}/videos',[ChannelController::class,'videos'])->name('channel.videos');
  Route::get('{id}/playlists',[ChannelController::class,'playlists'])->name('channel.playlists');
  Route::get('{id}/community',[ChannelController::class,'community'])->name('channel.community');
  Route::get('{id}/about',[ChannelController::class,'about'])->name('channel.about');
  Route::get('{id}/search',[ChannelController::class,'search'])->name('channel.search');
});
