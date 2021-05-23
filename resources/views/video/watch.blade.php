@extends('layouts.app')
@section('content')
    <div class="flex">
        <div class="flex-auto w-2/3 m-2">
            <div class="w-4/5">
                <video controls class="w-full" autoplay>
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
              <div class="relative ">
                <p>
                    <a href="{{route('channel.show',$video->channel->id)}}">
                    <div class="flex mb-2">
                     <img src="/storage/channelCover/{{$video->channel->cover}}" alt=""
                        class="w-20 h-20 rounded-full inline">
                      <div class="ml-3 mt-2">
                       <p class="text-xl font-bold">{{$video->channel->name}}</p>
                       <p class="text-xl">{{$video->channel->subscribes->count()}} subscribers</p>
                      </div>
                    </a>   
                    </div>
                    <subscribe-component channel-id="{{$video->channel->id}}" @auth user-id="{{Auth::user()->id}}" @endauth
                    class="absolute top-0 right-0"/>
                    <p class="text-lg">{{$video->description}}</p>
                  </p>    
              </div> 
            </div>
            {{-- <div class="block w-full p-2">
                <p class="text-xl">{{$video->comments->count()}} comments</p>
                <div>
                    @auth
                    <p class="text-2xl">comment as {{Auth::user()->name}}</p>
                    <form method="post" action="{{route('comment.store')}}">
                        @csrf
                        <input type="hidden" name="video" value="{{$video->id}}">
                        <input type="hidden" name="user" value="{{Auth::user()->id}}">
                        <textarea name="body" id="" cols="60" rows="10" class="block m-2 text-xl rounded-lg"></textarea>
                        <input type="submit" value="comment" class="m-2 py-1 rounded px-3 bg-red-600 text-xl text-white">
                      </form>
                    @else
                     <p>sign in to comment <a href="{{route('login')}}" 
                        class="text-xl text-gray-200 bg-red-600 rounded p-1 no-underline">sign in</a></p>
                    @endauth
                </div>
                @foreach ($video->comments as $comment)
                    <div class="rounded-md bg-blue-100 w-max p-2 m-2">
                        <img src="avatar/{{$comment->user->id}}" alt="" width="25px">
                        <p>
                         <span class="text-lg font-bold">{{$comment->user->name}}</span>
                         <span>{{$comment->updated_at}}</span>
                         </p>
                         <p>{{$comment->body}}</p>
                         <p>
                         <span>{{$comment->likes->count()}}</span>
                         <span>{{$comment->likes->count()}}</span>
                        </p>
                        @if(Auth::user()->id===$comment->user->id)
                            <a href="{{route('comment.edit')}}">edit</a>
                        @endif
                        @if(Auth::user()->id===$comment->user->id)
                            <a href="{{route('comment.delete')}}">delete</a>
                        @endif
                    </div>
                @endforeach
            </div> --}}
            <comment-component video-id="{{$video->id}}" @auth user-id="{{Auth::user()->id}}" @endauth/>
        </div>
        <div class="flex-auto md:block justify-center">
          <p class="text-2xl m-3 text-bold">Recommended videos</p>
                @forelse ($recommendedVideos as $video)
                <a href="{{route('video.watch',$video->id)}}" class="hover:no-underline hover:text-black">
                    <div class="flex flex-auto mx-3 my-2">
                        <img src="/storage/videoCover/{{$video->cover}}" width="100px" height="70px" alt="">
                        <div class="m-2 p-1">
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