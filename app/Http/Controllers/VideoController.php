<?php

namespace App\Http\Controllers;

use App\Http\Requests\VideoFormRequest;
use App\Models\Video;
use App\Models\Channel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $searchQuery=$request->searchQuery;
        $channels=Channel::where('name','like',"%${searchQuery}%")->get();
        $videos=Video::where('title','like',"%${searchQuery}%")->get();
        return view('video.search',['videos'=>$videos,'channels'=>$channels,'searchQuery'=>$searchQuery]);
    }
    public function index()
    {
       $videos=Video::latest()->take(100)->inRandomOrder()->get();
       return view('video.index',['videos'=>$videos]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // if(Auth::user()->channel){
        //     return view('video.upload');
        // }
        //return redirect()->route('login');
        //return redirect()->route('channel.create');
        return view('video.upload');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(VideoFormRequest $request)
    {
         $video=new Video;
         $video->title=$request->title;
         $video->description=$request->description;
         $id=$request->userId;
         //$channel=User::find($id);
         $video->channel_id=1;
         $video->save();
         $extension=$request->cover->extension();
         $video->cover=$video->id.'.'.$extension;
         $video->save();
         $request->cover->storeAS('videoCover',$video->cover,'public');
         $request->video->storeAs('video',$video->id.'.mp4','public');
         return redirect()->route('video.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    { 
        $recommendedVideos=Video::latest()->get();
        $video=Video::findOrFail($id);
        return view('video.watch',['video'=>$video,'recommendedVideos'=>$recommendedVideos]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function edit(Video $video)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Video $video)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function destroy(Video $video)
    {
        //
    }
    public function getLike($videoId,$userId)
    {
      if(DB::table('user_video')->
       where([['video_id',$videoId],['user_id',$userId],['type','like']])
       ->exists()){
           $liked=true;
       }
       else{
           $liked=false;
       }
       return response()->json([$liked]);
    }
    public function postLike($videoId,$userId)
    {
       DB::table('user_video')->insert(['type'=>'like','video_id'=>$videoId,'user_id'=>$userId]);
       return response()->json('ok');
    }
    public function getDislike($videoId,$userId)
    {
       $liked=DB::table('user_video')->where('video_id',$videoId)
       ->where('user_id',$userId)->where('type','dislike')->get();
       return response()->json($liked);
    }
    public function postDislike($videoId,$userId)
    {
       DB::table('user_video')->insert(['type'=>'dislike','videoId'=>$videoId,'userId'=>$userId]);
    }
}
