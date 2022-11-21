<?php

namespace App\Http\Controllers;

use App\Http\Requests\VideoFormRequest;
use App\Jobs\UploadVideo;
use App\Models\Video;
use App\Models\Channel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Notifications\ChannelNewVideo;

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
        foreach ($channels as $channel) {
          $channel->created_at=$channel->created_at->diffForHumans();
        }
        $videos=Video::where('title','like',"%${searchQuery}%")->get();
        foreach ($videos as $video) {
          $video->created_at=$video->created_at->diffForHumans();
        }
        return view('video.search',['videos'=>$videos,'channels'=>$channels,'searchQuery'=>$searchQuery]);
    }
    public function index()
    {
       $videos=Video::latest()->take(100)->inRandomOrder()->get();
       foreach ($videos as $video) {
        $video->created_at=$video->created_at->diffForHumans();
      }
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
        $user=User::findOrfail($id);
        $video->channel_id=$user->channel->id;
        $video->save();
        $imageExtension=$request->cover->extension();
        $video->cover=$video->id.'.'.$imageExtension;
        $videoExtension=$request->video->extension();
        $video->source=$video->id.'.'.$videoExtension;
        $video->save();
        $request->cover->storeAS('videoCover',$video->cover,'public');
        UploadVideo::dispatch($video->source,$request);
        //$request->video->storeAs('video',$video->source,'public');
         $channel=Channel::find($video->channel_id);
         $subscribers=$channel->subscribes;
         if($subscribers){
            foreach($subscribers as $subscriber){
                $subscriber->notify(new ChannelNewVideo($channel,$video));
            }
         }
         return redirect()->route('home');
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
        foreach ($recommendedVideos as $video) {
          $video->created_at=$video->created_at->diffForHumans();
        }
        $video=Video::findOrFail($id);
        $video->created_at=$video->created_at->diffForHumans();
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
    public function getLike(Request $request)
    {
      $totalLikes=DB::table('user_video')->
      where([['user_id',$request->userId],['video_id',$request->videoId],['type','like']])->count();
      $totalDislikes=DB::table('user_video')->
      where([['user_id',$request->userId],['video_id',$request->videoId],['type','dislike']])->count();
      if(DB::table('user_video')->
       where([['video_id',$request->videoId],['user_id',$request->userId],['type','like']])
       ->exists()){
           $liked=true;
       }
       else{
           $liked=false;
       }
       if(DB::table('user_video')->
       where([['video_id',$request->videoId],['user_id',$request->userId],['type','dislike']])
       ->exists()){
           $disliked=true;
       }
       else{
           $disliked=false;
       }
       return response()->json(['liked'=>$liked,'disliked'=>$disliked,
       'totalLikes'=>$totalLikes,'totalDislikes'=>$totalDislikes]);
    }
    public function postLike(Request $request)
    {
      if($request->status){
        DB::table('user_video')->where([['video_id',$request->videoId],['user_id',$request->userId]])->delete();
      }
      else{
        if(DB::table('user_video')->where([['user_id',$request->userId],['video_id',$request->videoId]])->exists()){
            DB::table('user_video')->update(['type'=>$request->type]);
        }
        else{
         DB::table('user_video')->insert(['user_id'=>$request->userId,'video_id'=>$request->videoId,'type'=>$request->type]);
        }
      }
    }
    public function comments(Request $request)
    {
      $video=Video::find($request->videoId);
      $comments=$video->comments;
      foreach($comments as $comment){
        $comment->created_at=$comment->created_at->diffForHumans();
        $user=User::find($comment->user_id);
        $comment->user=$user;
        $comment->totalLikes=DB::table('comment_user')->where([['comment_id',$comment->id],['type','like']])->count();
        $comment->totalDislikes=DB::table('comment_user')->where([['comment_id',$comment->id],['type','dislike']])->count();
        if(DB::table('comment_user')->where([['user_id',$request->userId],['comment_id',$comment->id],['type','like']])->exists())
        {
          $comment->status='liked';
        }
        else if(DB::table('comment_user')->where([['user_id',$request->userId],['comment_id',$comment->id],['type','dislike']])->exists()){
          $comment->status='disliked';
        }
        else{
          $comment->status='unknown';
        }
      }
      $user=User::find($request->userId);
      return response()->json(['comments'=>$comments,'user'=>$user]);
    }
}
