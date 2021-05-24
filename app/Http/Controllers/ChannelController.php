<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use Illuminate\Http\Request;
use App\Http\Requests\ChannelFormRequest;
use Illuminate\Support\Facades\DB;

class ChannelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('channel.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ChannelFormRequest $request)
    {
        $channel=new Channel;
        $channel->name=$request->name;
        $channel->description=$request->description;
        $channel->user_id=$request->user;
        $channel->cover='icon.png';
        $channel->save();
        $extension=$request->cover->extension();
        $channel->cover=$channel->id.'.'.$extension;
        $channel->save();
        $request->cover->storeAs('channelCover',$channel->cover,'public');
        return redirect()->route('video.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Channel  $channel
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $channel=Channel::findOrFail($id);
        return view('channel.show',['channel'=>$channel]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Channel  $channel
     * @return \Illuminate\Http\Response
     */
    public function edit(Channel $channel)
    {
        return view('channel.edit',['channel'=>$channel]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Channel  $channel
     * @return \Illuminate\Http\Response
     */
    public function update(ChannelFormRequest $request)
    {  
        $channel=Channel::find($request->id);
        $this->authorize('update',$channel);
        $channel->name=$request->name;
        $channel->description=$request->description;
        if($request->has('cover')){
            $channel->cover=$channel->id.'.'.$request->cover->extension();
        }
        if($request->has('background')){
            $channel->background=$channel->id.'.'.$request->background->extension();
        }
        $channel->save();
        if($request->has('cover')){
            $request->cover->storeAs('channelCover',$channel->cover,'public');
        }
        if($request->has('background')){
            $request->background->storeAs('channelBackground',$channel->background,'public');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Channel  $channel
     * @return \Illuminate\Http\Response
     */
    public function destroy(Channel $channel)
    { 
        $this->authorize('delete',$channel);
        $channel->delete;
    }
    public function getSubscribe(Request $request)
    {
       if(DB::table('channel_user')->where([['channel_id',$request->channelId],['user_id',$request->userId]])->exists())
       {
           $subscribed=true;
       }
       else{
           $subscribed=false;
       }
       return response()->json(['subscribed'=>$subscribed]);
    }
    public function postSubscribe(Request $request)
    {
      if(DB::table('channel_user')->where([['channel_id',$request->channelId],['user_id',$request->userId]])->exists()){
        DB::table('channel_user')->where([['channel_id',$request->channelId],['user_id',$request->userId]])->delete();
      }
      else{
        DB::table('channel_user')->insert(['channel_id'=>$request->channelId,'user_id'=>$request->userId]);
      }
    }
    public function videos($id)
    {
       $channel=Channel::find($id);
       return view('channel.videos',['channel'=>$channel]);
    }
    public function playlists($id)
    {
       $channel=Channel::find($id);
       return view('channel.playlists',['channel'=>$channel]);
    }
    public function community($id)
    {
       $channel=Channel::find($id);
       return view('channel.community',['channel'=>$channel]);
    }
    public function about($id)
    {
       $channel=Channel::find($id);
       return view('channel.about',['channel'=>$channel]);
    }
    public function search($id)
    {
       $channel=Channel::find($id);
       return view('channel.search',['channel'=>$channel]);
    }
}
