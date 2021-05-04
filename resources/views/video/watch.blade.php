@extends('layouts.app')
@section('content')
    <div class="flex">
        <div class="flex-auto w-2/3 m-2">
            <div class="w-full">
                <video controls class="w-full">
                    <source  src="storage/videos/1.mp4" type="video/mp4"/>
                        your browser does not support html5 video
                </video>
            </div>
            <div class="w-full">
                video controll
            </div>
            <div class="w-full">
               <p class="text-xl text-center">{{$video->title}}</p>
               <p class="divide-x divide-gray-500">
                   <span class="m-2 text-xl">{{$video->views}} views</span>
                   <span class="m-2 text-xl">{{$video->created_at}}</span>
                   @if (Auth::check())
                   <like-component videoId="{{$video->id}}" userId="{{Auth::user()->id}}"/>
                   @endif
                   <span>{{$video->like}}</span>
                   @if (Auth::check())
                   <dislike-component videoId="{{$video->id}}" userId="{{Auth::user()->id}}"/>
                   @endif
                   <span>{{$video->dislike}}</span>
               </p>
               <p>
                 <a href="{{route('channel.show',$video->channel->id)}}">
                 <img src="/storage/channelCover/{{$video->channel->cover}}" alt=""
                    class="w-50 rounded-full">
                    <p class="text-xl font-bold">{{$video->channel->name}}</p>--}]
                    <p>{{$video->description}}</p>
                </a>
               </p>
            </div>
            
            <div class="block w-full">
                <p>{{$video->comments->count()}} comments</p>
                <div>
                    <p class="text-2xl text-center">add your comment</p>
                    <form method="post" action="{{route('comment.store')}}">
                      @csrf
                      <input type="hidden" name="video" value="{{$video->id}}">
                      <input type="hidden" name="user" value="{{Auth::user()->id}}">
                      <textarea name="body" id="" cols="60" rows="10" class="block border-10 border-red-50"></textarea>
                      <input type="submit" value="comment" class="px-3 bg-red-600 text-xl text-white">
                    </form>
                </div>
                @foreach ($video->comments as $comment)
                    <div>
                        <img src="'users/'.{{$comment->commentedBy}}" alt="" width="25px">
                        <p>
                         <span>{{$comment->commentedBy}}</span>
                         <span>{{$comment->updated_at}}</span>
                         </p>
                         <p>{{$comment->body}}</p>
                         <p>
                         <span>{{$comment->liked}}</span>
                         <span>{{$comment->disliked}}</span>
                        </p>
                        @can('edit',Auth::user())
                            <a href="{{route('comment.edit')}}">edit</a>
                        @endcan
                        @can('delete',Auth::user())
                            <a href="{{route('comment.delete')}}">edit</a>
                        @endcan
                    </div>
                @endforeach
            </div>
        </div>
        <div class="flex-auto">
          <p>recommended videos</p>
            @forelse ($recommendedVideos as $video)
                <div>
                    <img src="/storage/covers/{{$video->cover}}" alt="" width="100px">
                    <p>{{$video->title}}</p>
                    <span>{{$video->channel}}</span>
                    <span>{{$video->views}}</span>
                    <span>{{$video->updated_at}}</span>
                </div>
            @empty
              no recommended videos  
            @endforelse
        </div>
    </div>
@endsection