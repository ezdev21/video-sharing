@extends('layouts.app')
@section('content')
    <div>
        <div>
            <video src="'videos/'.{{$video->id.'mp4'}}"></video>
        </div>
        <div>
            video controll
        </div>
        <div>
           <p>{{$video->title}}</p>
           <p>
               <span>{{$video->views}}</span>
               <span>{{$video->created_at}}</span>
               @if (Auth::check())
               <likeComponent videoId="{{$video->id}}" userId="{{Auth::user()->id}}"/>
               @endif
               <span>{{$video->like}}</span>
               @if (Auth::check())
               <<dislikeComponent videoId="{{$video->id}}" userId="{{Auth::user()->id}}"/>
               @endif
               <span>{{$video->dislike}}</span>
           </p>
        </div>
        
        <div>
            <p>{{$video->comments->count()}} comments</p>
            <div>
                <form method="post" action="{{route('comment.store')}}">
                  @csrf
                  <textarea name="body" id="" cols="60" rows="10" class="block border-10 border-red-50"></textarea>
                  <input type="submit" value="comment" class="px-3 bg-blue-900 text-xl text-white">
                </form>
            </div>
            @foreach ($video->comments as $item)
                <div>
                    <img src="users/''.{{$comment->commentedBy->avatar}}" alt="" width="25px">
                    <p>
                     <span>{{$comment->commentedBy->name}}</span>
                     <span>{{$comment->updated_at}}</span>
                     </p>
                     <p>{{$comment->body}}</p>
                     <p>
                     <span>{{$comment->liked}}</span>
                     <span>{{$comment->disliked}}</span>
                    </p>
                    @can('edit',$user)
                        <a href="{{route('comment.edit')}}">edit</a>
                    @endcan
                    @can('delete',$user)
                        <a href="{{route('comment.delete')}}">edit</a>
                    @endcan
                </div>
            @endforeach
        </div>
        <div>
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