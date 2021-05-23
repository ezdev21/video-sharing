@extends('layouts.app')
@section('content')
 <div class="p-1 -mb-6">
    <img src="/storage/channelBackground/{{$channel->background}}" alt="">
     <div class="m-2 p-2 flex">
         <img src="/storage/channelCover/{{$channel->cover}}" alt="" 
         class="w-20 h-20 rounded-full ">
         <div class="my-auto mx-5">
            <p class="text-4xl">{{$channel->name}}</p>
            <p class="text-xl ">{{$channel->subscribes->count()}} subscribers</p>
         </div>
         <div class="mx-3 my-auto">
            @if(Auth::check())
            <subscribe-component channel-id="{{$channel->id}}" user-id="{{Auth::user()->id}}"/>  
           @endif
           @can('edit',$channel)
            <a href="{{route('channel.edit',$channel->id)}}" class="text-xl font-semibold mx-2">edit channel</a>
           @endcan
           @can('delete',$channel)
            <a href="{{route('channel.delete',$channel->id)}}" class="text-xl font-semibold mx-2">delete channel</a>
           @endcan
         </div>
     </div>
     <nav class="p-2 m-2">
       <ul class="list-style-none flex">
        <li class="mx-2 p-2"><a href="{{route('channel.videos',$channel->id)}}" class="text-2xl no-undeline">videos</a></li>
        <li class="mx-2 p-2"><a href="{{route('channel.playlists',$channel->id)}}" class="text-2xl no-undeline">playlists</a></li>
        <li class="mx-2 p-2"><a href="{{route('channel.community',$channel->id)}}" class="text-2xl no-undeline">community</a></li>
        <li class="mx-2 p-2"><a href="{{route('channel.about',$channel->id)}}" class="text-2xl no-undeline">about</a></li>   
        <li class="mx-2 p-2"><a href="{{route('channel.search',$channel->id)}}" class="text-2xl no-undeline">search</a></li>
       </ul>  
     </nav>
     {{--<channel-component channel-id="{{$channel->id}}"/>--}}
 </div>   
@endsection