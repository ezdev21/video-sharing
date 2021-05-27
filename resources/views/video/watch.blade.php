@extends('layouts.app')
@section('content')
    <div class="flex">
        <div class="flex-auto w-2/3 m-2">
            <div class="mx-2 w-full bg-black">
                <video controls class="w-full">
                    <source  src="/storage/video/{{$video->source}}" type="video/mp4"/>
                        your browser does not support html5 video
                </video>
            </div>
            <div class="w-full">
             <div class="border-b-2 m-2 p-2 border-gray-300">
                <p class="ml-2 text-2xl">{{$video->title}}</p>
                <p class="">
                    <span class="m-2 text-xl">{{$video->views}} views</span>
                    <span class="m-2 text-xl">{{$video->created_at->toDateString()}}</span>
                    <like-component video-id="{{$video->id}}" @auth user-id="{{Auth::user()->id}}"@endauth/>
                </p>  
             </div>
              <div class="">
                  <a href="{{route('channel.show',$video->channel->id)}}" class="hover:no-underline">
                    <div class="flex mb-2">
                    <img src="/storage/channelCover/{{$video->channel->cover}}" alt=""
                        class="w-20 h-20 rounded-full inline" />
                    <div class="ml-3 mt-2">
                      <p class="text-xl font-bold">{{$video->channel->name}}</p>
                      <p class="text-xl">{{$video->channel->subscribes->count()}} subscribers</p>
                    </div>  
                    </div>
                   </a>
                   <subscribe-component channel-id="{{$video->channel->id}}" @auth user-id="{{Auth::user()->id}}" @endauth/>     
                   <p class="text-lg">{{$video->description}}</p>
              </div> 
            </div>
            <comment-component video-id="{{$video->id}}" @auth user-id="{{Auth::user()->id}}" @endauth/>
        </div>
        <div class="flex-auto md:block justify-center">
          <p class="text-2xl m-3 text-bold">Recommended videos</p>
                @forelse ($recommendedVideos as $video)
                <a href="{{route('video.watch',$video->id)}}" class="hover:no-underline hover:text-black">
                    <div class="flex flex-auto mx-3 my-2">
                        <img src="/storage/videoCover/{{$video->cover}}" class="w-60" alt="">
                        <div class="mx-2">
                          <p class="text-xl">{{$video->title}}</p>
                          <p class="text-lg">{{$video->channel->name}}</p>
                          <p>
                           <span>{{$video->views}} views</span>.
                           <span>{{$video->updated_at->format('Y-m-d')}}</span>
                          </p>
                         </div>
                    </div>
                </a>
            @empty
              no recommended videos  
            @endforelse
        </div>
    </div>
@endsection