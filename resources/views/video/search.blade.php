@extends('layouts.app')
@section('content')
 <div class="flex flex-wrap">
  @foreach ($channels as $channel)
      <a href="{{route('channel.show',$channel->id)}}">
      <div>
        <img src="/storage/channelCover/{{$channel->cover}}">
        <p>{{$channel->name}}</p>
      </div>
      </a> 
  @endforeach
  </div>
  <div class="flex flex-wrap">
    @forelse ($videos as $video)
    <a href="{{route('video.watch',$video->id)}}">
      <div class="flex-auto">
        <img src="/storage/videoCover/{{$video->cover}}">
        <p>{{$video->title}}</p>
        <p>{{$video->views}}</p>
        <p>{{$video->channel->name}}</p>
      </div>
    </a>
   @empty
  <p class="text-3xl text-red-600 text-bold text-center">oops no video was found like {{$searchQuery}}</p> 
 @endforelse  
  </div>
@endsection