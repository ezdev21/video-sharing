@extends('layouts.app')
@section('content')
 <div>
    <img src="storage/channelBackground/{{$channel->id}}" alt="">
     <div>
         <img src="storage/channelCover/{{$channel->id}}" alt="" 
         class="w-25 rounded-full ">
         <p class="text-3xl">{{$channel->name}}</p>
         <p>{{$channel->subscribes->count()}} subscribers</p>
         @if(Auth::check())
          <subscribe-component channelid="{{$channel->id}}" userid="{{Auth::user()->id}}"/>  
         @endif
     </div>
     <nav>
      <ul class="list-style-none flex">
          <li><a href="{{route('channel.home',$channel->id)}}" 
            class="uppercase no-undeline text-xl text-gray-900">home</a></li>
          <li><a href="{{route('channel.videos',$channel->id)}}"
            class="uppercase no-undeline text-xl text-gray-900">videos</a></li>
          <li><a href="{{route('channel.playlists',$channel->id)}}"
            class="uppercase no-undeline text-xl text-gray-900">playlists</a></li>
          <li><a href="{{route('channel.channels',$channel->id)}}"
            class="uppercase no-undeline text-xl text-gray-900">channels</a></li>
          <li><a href="{{route('channel.about',$channel->id)}}"
            class="uppercase no-undeline text-xl text-gray-900">about</a></li>
          <li>
            <form method="POST" action="{{route('channel.search')}}">
                <input type="text" name="search" placeholder="search">
            </form>
          </li>
      </ul>
     </nav>
 </div>   
@endsection