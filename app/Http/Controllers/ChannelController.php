<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\User;
use App\Notifications\NewSubscriber;
use Illuminate\Http\Request;
use App\Http\Requests\ChannelStoreRequest;
use App\Http\Requests\ChannelEditRequest;
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
        $this->middleware('auth')->only(['create','store','edit','update','delete']);
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
    public function store(ChannelStoreRequest $request)
    {
        $channel=new Channel;
        $channel->name=$request->name;
        $channel->description=$request->description;
        $channel->user_id=$request->userId;
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
    public function show(Channel $channel)
    {
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
    public function update(ChannelEditRequest $request)
    {
        $channel=Channel::find($request->channelId);
        $this->authorize('update',$channel);
        $channel->name=$request->name;
        $channel->description=$request->description;
        $channel->save();
        if($request->has('cover')){
            $channel->cover=$channel->id.'.'.$request->cover->extension();
            $request->cover->storeAs('channelCover',$channel->cover,'public');
        }
        if($request->has('background')){
            $channel->background=$channel->id.'.'.$request->background->extension();
            $request->background->storeAs('channelBackground',$channel->background,'public');
        }
        $channel->save();
        return view('channel.show',['channel'=>$channel]);
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
        $channel->delete();
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
        $user=User::find($request->userId);
        $channel=Channel::find($request->channelId);
        $channelOwner=User::find($channel->user->id);
        $channelOwner->notify(new NewSubscriber($user));
      }
    }

    public function videos(Request $request)
    {
       $channel=Channel::find($request->channelId);
       $videos=$channel->videos;
       return response()->json(['videos'=>$videos]);
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
