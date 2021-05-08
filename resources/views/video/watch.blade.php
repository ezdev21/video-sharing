@extends('layouts.app')
@section('content')
    <div class="flex">
        <div class="flex-auto w-2/3 m-2">
            <div class="w-full">
                <video controls class="w-full">
                    <source  src="storage/videos/{{$video->id}}.mp4" type="video/mp4"/>
                        your browser does not support html5 video
                </video>
            </div>
            <div class="w-full">
               <p class="ml-2 text-xl">{{$video->title}}</p>
               <p class="">
                   <span class="m-2 text-xl">{{$video->views}} views</span>
                   <span class="m-2 text-xl">{{$video->created_at}}</span>
                   @auth
                   <like-component videoid="{{$video->id}}" userid="{{Auth::user()->id}}"/>
                   @endauth
                   <span>{{$video->likes->count()}}</span>
                   @auth
                   <dislike-component videoid="{{$video->id}}" userid="{{Auth::user()->id}}"/>
                   @endauth
                   <span>{{$video->likes->count()}}</span>
               </p>
               <p>
                 <a href="{{route('channel.show',$video->channel->id)}}">
                 <img src="/storage/covers/{{$video->channel->cover}}" alt=""
                    class="w-50 rounded-full"> </a>
                    <p class="text-xl font-bold">{{$video->channel->name}}</p>
                    <span>
                        @auth
                        <subscribe-component videoid="{{$video->id}}" userid="{{Auth::user()->id}}"/>
                        @endauth
                    </span>
                    <span>{{$video->subscribers}}</span>
                    <p>{{$video->description}}</p>
               </p>
            </div>
            <div class="block w-full p-2">
                <p class="text-xl">{{$video->comments->count()}} comments</p>
                <div>
                    <p class="text-2xl">comment as {{Auth::user()->name}}</p>
                    @if (Auth::check())
                    <form method="post" action="{{route('comment.store')}}">
                        @csrf
                        <input type="hidden" name="video" value="{{$video->id}}">
                        <input type="hidden" name="user" value="{{Auth::user()->id}}">
                        <textarea name="body" id="" cols="60" rows="10" class="block m-2 text-xl rounded-lg"></textarea>
                        <input type="submit" value="comment" class="m-2 py-1 rounded px-3 bg-red-600 text-xl text-white">
                      </form>
                    @endif
                </div>
                @foreach ($video->comments as $comment)
                    <div class="rounded-md bg-blue-100 w-max p-2 m-2">
                        <img src="avatars/{{$comment->user->id}}" alt="" width="25px">
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
            </div>
        </div>
        <div class="flex-auto justify-center">
          <p class="text-2xl m-3 text-bold">Recommended videos</p>
                @forelse ($recommendedVideos as $video)
                <a href="{{route('video.watch',$video->id)}}">
                    <div class="flex-auto mx-3">
                        <img src="/storage/videoCovers/{{$video->cover}}" alt="" width="250px">
                        <p>{{$video->title}}</p>
                        <p>{{$video->channel->name}}</p>
                        <p>
                           <span>{{$video->views}} views</span>.
                           <span>{{$video->updated_at}}</span>
                        </p>
                    </div>
                </a>
            @empty
              no recommended videos  
            @endforelse
        </div>
    </div>
@endsection