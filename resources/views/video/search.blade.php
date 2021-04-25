@extends('layouts.app')
@section('content')
 <div class="flex flex-wrap">
 @forelse ($videos as $video)
    <a href="{{route('video.watch',$video->id)}}">
      <div class="m-5 p-5">
        <img src="'public/'.{{$video->cover}}">
        <p>{{$video->title}}</p>
        <p>{{$video->views}}</p>
        <p>{{$video->channel}}</p>
      </div>
    </a>
 @empty
  <p>oops no video was found like {{$query}}</p> 
 @endforelse    
 <div>
@endsection