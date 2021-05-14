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
        return view('channel.show',$channel);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Channel  $channel
     * @return \Illuminate\Http\Response
     */
    public function edit(Channel $channel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Channel  $channel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Channel $channel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Channel  $channel
     * @return \Illuminate\Http\Response
     */
    public function destroy(Channel $channel)
    {
        //
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
      return response()->json(['channelId'=>$request->channelId,'userId'=>$request->userId]);
    }
}
