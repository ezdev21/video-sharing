@extends('layouts.app')
@section('content')
 <div class="p-2 m-2">
    <img src="/storage/channelBackground/{{$channel->background}}" alt="">
     <div class="m-2 p-2">
         <img src="/storage/channelCover/{{$channel->cover}}" alt="" 
         class="w-20 h-20 rounded-full ">
         <p class="text-3xl">{{$channel->name}}</p>
         <p>{{$channel->subscribes->count()}} subscribers</p>
         @if(Auth::check())
          <subscribe-component channel-id="{{$channel->id}}" user-id="{{Auth::user()->id}}"/>  
         @endif
     </div>
     <channel-component channel-id="{{$channel->id}}"/>
 </div>   
@endsection