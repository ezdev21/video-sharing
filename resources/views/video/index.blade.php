@extends('layouts.app')
@section('content')
    <div>
      @forelse ($videos as $video)
        <a href="{{route('watch.video',$video->id)}}">
          <div>
              <img src="'public/'.{{$video->id}}" alt="">
              <p>{{$video->title}}</p>
              <p>{{$video->views}}</p>
              <p>{{$video->channel}}</p>
          </div>
        </a>
      @empty
        <p>error in loading videos</p>
      @endforelse
    </div>
@endsection