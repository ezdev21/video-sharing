@extends('layouts.app')
@section('content')
    <div>
        <video src="'videos/'.{{$video->id}}"></video>
        <div>
            video controll
        </div>
        <div>
           <p>{{$video->title}}</p>
           <p>
               <span>{{$video->views}}</span>
               <span>{{$video->created_at}}</span>
                <likeComponent videoId="{{$video->id}}" userId="{{$Auth->user()->id}}"/>
               <span>{{$video->like}}</span>
               <dislikeComponent videoId="{{$video->id}}" userId="{{$Auth->user()->id}}"/>
               <span>{{$video->dislike}}</span>
           </p>
        </div>
        <div>
           <img src="'channels/'.{{$channel->avatar}}" alt="" width="50px">
           <span>{{$video->channel->subscribers->count()}} subscribers</span>
           <subscribeComponent />
        </div>
        <div>
            <p>{{$video->comments->count()}} comments</p>
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