<?php

namespace App\Http\Controllers;

use App\Http\Requests\VideoFormRequest;
use App\Jobs\UploadVideo;
use App\Jobs\UploadVideoImage;
use App\Models\Video;
use App\Models\Channel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Notifications\ChannelNewVideo;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
       $this->middleware('auth',['create','store','edit','update','delete']);
    }

    public function search(Request $request)
    {
        $searchQuery=$request->searchQuery;
        $channels=Channel::where('name','like',"%${searchQuery}%")->get();
        $videos=Video::where('title','like',"%${searchQuery}%")->get();
        return view('video.search',['videos'=>$videos,'channels'=>$channels,'searchQuery'=>$searchQuery]);
    }

    public function index()
    {
       //video recommendation system will be done in the future
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
        $video=Video::create($request->validated());
        $imageExtension=$request->cover->extension();
        $video->cover=$video->id.'.'.$imageExtension;
        $videoExtension=$request->video->extension();
        $video->source=$video->id.'.'.$videoExtension;
        $video->save();
        //$request->cover->storeAS('videoCover',$video->cover,'public');
        UploadVideoImage::dispatch($video->cover,$request);
        //$request->video->storeAs('video',$video->source,'public');
        UploadVideo::dispatch($video->source,$request);
         $channel=Channel::find($video->channel_id);
         $channel->subscribes->each(function($subscriber) use($channel,$video){
            $subscriber->notify(new ChannelNewVideo($channel,$video));
         });
         return redirect()->route('home');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function show(Video $video)
    {
        $recommendedVideos=Video::where('title',$video->title)->latest()->limit(20)->inRandomOrder()->get();
        $video->views+=1;
        $video->save();
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
        return view('video.edit',['video'=>$video]);
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
        $video->update($request->validated());
        return redirect()->route('video.show',$video);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function destroy(Video $video)
    {
        $video->delete();
        Storage::delete("/videoCover/{{$video->image}}");
        Storage::delete("/videoCover/{{$video->source}}");
        return redirect()->route('channel.watch',$video->channel->id);
    }

    public function getLike(Request $request)
    {
      $video=Video::find($request->videoId);
      $totalLikes=$video->users()->where('type','like')->count();
      $totalDislikes=$video->users()->where('type','dislike')->count();
      $liked=$video->users()->where([['type','like'],['user_id',$request->userId]])->exists();
      $disliked=$video->users()->where([['type','dislike'],['user_id',$request->userId]])->exists();
      return response()->json([
        'liked'=>$liked,
        'disliked'=>$disliked,
        'totalLikes'=>$totalLikes,
        'totalDislikes'=>$totalDislikes
      ]);
    }

    public function postLike(Request $request)
    {
      if($request->status){
        $this->question->users()->detach(auth()->user()->id);
      }
      else{
        $this->question->users()->syncWithoutDetaching([auth()->user()->id=>['type'=>'like']]);
      }
    }

    public function comments(Request $request)
    {
      $video=Video::find($request->videoId);
      $comments=$video->comments;
      foreach($comments as $comment){
        $comment->created_at=$comment->created_at->diffForHumans();
        $comment->totalLikes=$comment->users()->where([['comment_id',$comment->id],['type','like']])->count();
        $comment->totalDislikes=$comment->users()->where([['comment_id',$comment->id],['type','dislike']])->count();
        $liked=$comment->users()->where([['user_id',$request->userId],['comment_id',$comment->id],['type','like']])->exists();
        $disliked=$comment->users()->where([['user_id',$request->userId],['comment_id',$comment->id],['type','like']])->exists();
      }
      return response()->json(['comments'=>$comments]);
    }
}
