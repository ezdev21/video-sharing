@extends('layouts.app')
@section('content')
    <div class="flex flex-wrap">
      @forelse ($videos as $video)
        <a href="{{route('video.watch',$video->id)}}">
          <div class="m-5 p-5 ">
              <img src="/covers/2.jpg" alt="image not found">
              <p>{{$video->title}}</p>
              <p>{{$video->views}} views</p>
              <p>{{$video->channel}}</p>
          </div>
        </a>
      @empty
        <p>error in loading videos</p>
      @endforelse
    </div>
@endsection