@extends('layouts.app')
@section('content')
    <div class="flex flex-col lg:flex-row xl:flex-row 2xl:flex-row">
        <div class="flex-auto w-full lg:w-2/3 xl:w-2/3 2xl:w-2/3 mx-4 mb-4 mt-2">
            <div class="w-full bg-black">
                <video controls class="w-full">
                    <source  src="/storage/video/{{$video->source}}" type="video/mp4"/>
                        your browser does not support html5 video
                </video>
            </div>
            <div class="w-full">
             <div class="border-b-2 my-2 py-2 border-gray-300">
                <p class="ml-2 text-2xl font-medium">{{$video->title}}</p>
                <p class="">
                    <span class="m-2 text-xl">{{$video->views}} views</span>
                    <span class="m-2 text-xl">{{$video->created_at->diffForHumans()}}</span>
                    <like-component video-id="{{$video->id}}" @auth user-id="{{Auth::user()->id}}"@endauth/>
                </p>
             </div>
              <div class="relative">
                  <div class="max-w-max">
                    <a href="/channel/show/{{$video->channel->id}}/videos" class="max-w-max hover:no-underline">
                        <div class="flex mb-2">
                        <img src="/storage/channelCover/{{$video->channel->cover}}" alt=""
                            class="w-20 h-20 rounded-full inline" />
                        <div class="ml-3 mt-2">
                          <p class="text-xl font-semibold">{{$video->channel->name}}</p>
                          <p class="text-xl">{{$video->channel->subscribes->count()}} subscribers</p>
                        </div>
                        </div>
                    </a>
                  </div>
                   <p class="text-lg">{{$video->description}}</p>
                   <div class="absolute top-0 right-0">
                    <subscribe-component channel-id="{{$video->channel->id}}" @auth user-id="{{Auth::user()->id}}" @endauth/>
                   </div>
              </div>
            </div>
            <comment-component video-id="{{$video->id}}" @auth user-id="{{Auth::user()->id}}" @endauth/>
        </div>
        <div class="flex-auto md:block">
            @foreach ($recommendedVideos as $video)
            <a href="{{route('video.watch',$video->id)}}" class="hover:no-underline hover:text-black">
                <div class="flex flex-auto my-2">
                    <img src="/storage/videoCover/{{$video->cover}}" class="w-60 h-36" alt="">
                    <div class="mx-2">
                    <p class="text-xl font-medium">{{$video->title}}</p>
                    <p class="text-md font-medium">{{$video->channel->name}}</p>
                    <p class="font-medium">
                     <span>{{$video->views}} views</span>
                     <span class="my-auto font-bold">.</span>
                     <span>{{$video->created_at->diffForHumans()}}</span>
                    </p>
                    </div>
                </div>
            </a>
            @endforeach
        </div>
    </div>
@endsection
