@extends('layouts.app')
@section('content')
 <div>
  @if ($channels->count()>0 || $videos->count()>0)
  <div class="flex flex-wrap">
    @foreach ($channels as $channel)
        <a href="{{route('channel.show',$channel->id)}}">
        <div class="flex-auto">
          <img src="/storage/channelCover/{{$channel->cover}}" width="50px">
          <p>{{$channel->name}}</p>
        </div>
        </a> 
    @endforeach
    </div>
    <div class="flex flex-wrap">
      @foreach ($videos as $video)
      <a href="{{route('video.watch',$video->id)}}">
        <div class="flex-auto">
          <img src="/storage/videoCover/{{$video->cover}}">
          <p>{{$video->title}}</p>
          <p>{{$video->views}}</p>
          <p>{{$video->channel->name}}</p>
        </div>
      </a>
      @endforeach
    </div> 
  @else
   <p class="text-2xl text-red=500 mx-10">opps nothing is found like {{$searchQuery}}</p>  
  @endif
 </div>
@endsection