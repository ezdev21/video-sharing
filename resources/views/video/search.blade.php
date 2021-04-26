@extends('layouts.app')
@section('content')
 <div class="flex flex-wrap">
  @foreach ($channels as $channel)
      <a href="{{route('channel.show',$channel->id)}}">
      <div>
        <img src="/storage/channelCover/{{$channel->cover}}">
        
      </div>
      </a> 
  @endforeach
 @forelse ($videos as $video)
    <a href="{{route('video.watch',$video->id)}}">
      <div class="m-5 p-5">
        <img src="/storage/videoCover/{{$video->cover}}">
        <p>{{$video->title}}</p>
        <p>{{$video->views}}</p>
        <p>{{$video->channel}}</p>
      </div>
    </a>
 @empty
  <p>oops no video was found like {{$searchQuery}}</p> 
 @endforelse    
 <div>
@endsection