@extends('layouts.app')
@section('content')
    <div class="flex flex-wrap px-5">
      @foreach ($videos as $video)
        <a href="{{route('video.watch',$video->id)}}" class="hover:no-underline">
          <div class="p-1 m-2">
              <img src="/storage/videoCover/{{$video->cover}}" class="w-64 h-36">
              <div class="flex">
                <img src="/storage/channelCover/{{$video->channel->cover}}" class="w-14 h-14 rounded-full my-auto mx-2">
                <div class="overflow-hidden">
                  <p class="truncate text-lg font-semibold">{{$video->title}}</p>
                  <p class="text-md font-medium">{{$video->channel->name}}</p>
                  <p class="font-medium">
                    <span>{{$video->views}} views</span>
                    <span class="my-auto font-bold">.</span>
                    <span>{{$video->created_at->diffForHumans()}}</span>
                  </p>
                </div>
              </div>
          </div>
        </a>
      @endforeach
    </div>
@endsection
