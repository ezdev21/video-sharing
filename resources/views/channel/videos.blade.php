@extends('layouts.app')
@section('content')
@include('channel.show')
<div class="flex m-2 p-2">
  @forelse ($channel->videos as $video)
   <a href="{{route('video.watch',$video->id)}}">
    <div class="flex-auto my-2">
        <img src="storage/videoCover/{{$video->cover}}" alt="" class="w-25">
        <p class="text-xl">{{$video->title}}</p>
        <p>
          <span>{{$video->views}} views</span>
          <span>{{$video->created_at}}</span>
        </p>
    </div>
   </a> 
  @empty
    <p class="text-xl mx-2 text-red-700">this channnel has no videos yet</p>  
  @endforelse 
</div>
@endsection