<?php

namespace App\Http\Controllers;

use App\Http\Requests\VideoFormRequest;
use App\Models\Video;
use App\Models\Channel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
        $channels=Channel::where('name','like',$searchQuery);
        $videos=Video::where('title','like',$searchQuery);
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
        // if(Auth::user()){
        //     return view('video.upload');
        // }
        //return redirect()->route('login');
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
         $video->channel_id=$request->userId;
         $video->save();
         $videoCoverName=$video->id.$request->cover->getClientMimeType();
         $video->save();
         $request->cover->storeAS('covers',$videoCoverName,'public');
         $request->video->storeAs('videos',$video->id.'.mp4','public');
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
    public function like($videoId,$userId)
    {
       DB::table('user_video')->insert(['videoId'=>$videoId,'userId'=>$userId]);
    }
    public function disLike($videoId,$userId)
    {
      DB::table('user_video')->insert(['videoId'=>$videoId,'userId'=>$userId]);
    }
}
