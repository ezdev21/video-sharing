@extends('layouts.app')
@section('content')
    <div class="flex">
        <div class="w-2/3">
            <div class="block w-full">
                <video src="'videos/'.{{$video->id.'mp4'}}"></video>
            </div>
            <div class="block w-full">
                video controll
            </div>
            <div class="block w-full">
               <p>{{$video->title}}</p>
               <p class="divide-x divide-gray-500">
                   <span class="m-2">{{$video->views}} views</span>
                   <span class="m-2">{{$video->created_at}}</span>
                   @if (Auth::check())
                   <likeComponent videoId="{{$video->id}}" userId="{{Auth::user()->id}}"/>
                   @endif
                   <span>{{$video->like}}</span>
                   @if (Auth::check())
                   <dislikeComponent videoId="{{$video->id}}" userId="{{Auth::user()->id}}"/>
                   @endif
                   <span>{{$video->dislike}}</span>
               </p>
            </div>
            
            <div class="block w-full">
                <p>{{$video->comments->count()}} comments</p>
                <div>
                    <form method="post" action="{{route('comment.store')}}">
                      @csrf
                      <input type="hidden" name="video" value="{{$video->id}}">
                      <input type="hidden" name="user" value="{{Auth::user()->id}}">
                      <textarea name="body" id="" cols="60" rows="10" class="block border-10 border-red-50"></textarea>
                      <input type="submit" value="comment" class="px-3 bg-blue-900 text-xl text-white">
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
        <div class="">
          <p>recommended videos</p>
            @forelse ($recommendedVideos as $video)
                <div>
                    <img src="'cover/'.{{$video->id}}" alt="">
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