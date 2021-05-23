@extends('layouts.app')
@section('content')
 <div>
  @if ($channels->count()>0 || $videos->count()>0)
  <div class="m-2 w-max">
    @foreach ($channels as $channel)
        <a href="{{route('channel.show',$channel->id)}}">
        <div class="flex p-2 w-max">
          <img src="/storage/channelCover/{{$channel->cover}}" class="w-24 h-24 rounded-full my-auto">
          <div class="m-2 p-2">
            <p class="text-2xl">{{$channel->name}}</p>
            <p>
              <span>{{$channel->subscribes->count()}}</span>
              <span>{{$channel->created_at->toDateString()}}</span>
            </p>
            <p>{{$channel->description}}</p>
          </div>
          <div class="my-auto">
            <subscribe-component channel-id="{{$channel->id}}" @auth user-id="{{Auth::user()->id}}" @endauth/>
          </div>
        </div>
        </a> 
    @endforeach
    </div>
    <div class="w-max">
      @foreach ($videos as $video)
      <a href="{{route('video.watch',$video->id)}}">
        <div class="flex m-3 w-max">
          <img src="/storage/videoCover/{{$video->cover}}" class="w-60 m-3">
          <div class="mx-2">
            <p class="text-xl m-1 font-semibold">{{$video->title}}</p>
            <p class="m-1">
              <span>{{$video->views}} views</span>
              <span>{{$video->created_at->toDateString()}}</span>
            </p>
            <div class="flex">
              <img src="/storage/channelCover/{{$video->channel->cover}}" class="w-12 h-12 rounded-full my-auto" alt="">
              <p class="text-lg my-auto m-1">{{$video->channel->name}}</p>
            </div>
            <p>{{$video->description}}</p>
          </div>
        </div>
      </a>
      @endforeach
    </div> 
  @else
   <p class="text-2xl text-red=500 mx-10">opps nothing is found like {{$searchQuery}}</p>  
  @endif
 </div>
@endsection