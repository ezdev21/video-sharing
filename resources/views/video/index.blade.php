@extends('layouts.app')
@section('content')
    <div class="flex flex-wrap px-5">
      @forelse ($videos as $video)
        <a href="{{route('video.watch',$video->id)}}" class="hover:no-underline">
          <div class="p-1 m-2 shadow-lg">
              <img src="storage/videoCover/{{$video->cover}}" class="w-60 h-36">
              <div class="flex">
                <img src="/storage/channelCover/{{$video->channel->cover}}" class="w-10 h-10 rounded-full my-auto mx-2">
                <div>
                  <p class="text-xl">{{$video->title}}</p>
                  <p class="text-lg">{{$video->channel->name}}</p>
                  <p>
                    <span>{{$video->views}} views</span>
                    <span>{{$video->created_at->toDateString()}}</span>
                  </p>
                </div>
              </div>
          </div>
        </a>
      @empty
        <p class="text-red-600 text-4xl text-center w-full">oops error in loading videos</p>
      @endforelse
    </div>
@endsection