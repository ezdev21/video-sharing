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
Route::get('watch/{videoId}',[VideoController::class,'show'])->name('video.watch');
Route::get('upload',[VideoController::class,'create'])->name('video.create');
Route::post('upload',[VideoController::class,'store'])->name('video.store');
Route::post('comment/create',[CommentController::class,'store'])->name('comment.store');
Route::get('comment/commentId/edit',[CommentController::class,'edit'])->name('comment.edit');
Route::patch('comment/update',[CommentController::class,'update'])->name('comment.update');
Route::delete('comment/delete',[CommentController::class,'deklete'])->name('comment.delete');
Route::get('channel',[ChannelController::class,'create'])->name('channel.create');
Route::post('channel',[ChannelController::class,'store'])->name('channel.store');