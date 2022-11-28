<?php
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\StasticsController;
use App\Http\Controllers\VideoController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/',[VideoController::class,'index'])->name('video.index');

Auth::routes();
Route::get('/home',[VideoController::class, 'index'])->name('home');

Route::post('search',[VideoController::class,'search'])->name('video.search');

Route::prefix('stastics')->group(function(){
  Route::get('/',[StasticsController::class,'index']);
  Route::get('/{channel}',[StasticsController::class,'show']);
});

Route::prefix('video')->group(function(){
  Route::get('upload',[VideoController::class,'create'])->name('video.create');
  Route::post('upload',[VideoController::class,'store'])->name('video.store');
  Route::get('watch/{video}',[VideoController::class,'show'])->name('video.watch');
  Route::get('like',[VideoController::class,'getLike']);
  Route::post('like',[VideoController::class,'postLike']);
  Route::get('comments',[VideoController::class,'comments']);
});

Route::prefix('channel')->group(function(){
  Route::get('{channel}/edit',[ChannelController::class,'edit'])->name('channel.edit')->middleware('can:update,channel');
  Route::patch('update',[ChannelController::class,'update'])->name('channel.update');
  Route::get('create',[ChannelController::class,'create'])->name('channel.create');
  Route::post('store',[ChannelController::class,'store'])->name('channel.store');
  Route::get('show/{id}',[ChannelController::class,'show'])->name('channel.show');
  Route::get('show/{channel}/{any}',[ChannelController::class,'show'])->where('any','.*');
  Route::delete('{channel}/delete',[ChannelController::class,'delete'])->name('channel.delete');
  Route::get('subscribe',[ChannelController::class,'getSubscribe']);
  Route::post('subscribe',[ChannelController::class,'postSubscribe']);
  Route::get('videos',[ChannelController::class,'videos'])->name('channel.videos');
  Route::get('playlists',[ChannelController::class,'playlists'])->name('channel.playlists');
  Route::get('community',[ChannelController::class,'community'])->name('channel.community');
  Route::get('about',[ChannelController::class,'about'])->name('channel.about');
  Route::get('search',[ChannelController::class,'search'])->name('channel.search');
});

Route::prefix('comment')->group(function(){
  Route::post('store',[CommentController::class,'store'])->name('comment.store');
  Route::patch('update',[CommentController::class,'update'])->name('comment.update');
  Route::delete('delete',[CommentController::class,'destroy'])->name('comment.delete');
  Route::post('like',[CommentController::class,'getLike']);
  Route::post('dislike',[CommentController::class,'postLike']);
});

Route::prefix('user')->group(function(){
  Route::post('notifications',[UserController::class,'notifications']);
  Route::patch('notification/mark-as-read',[UserController::class,'readNotification']);
});
