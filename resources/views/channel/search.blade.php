@include('channel.show')
<div>
  @forelse ($channel->videos as $video)
   <a href="{{route('video.watch',$video->id)}}">
    <div>
        <img src="storage/videoCovers/{{$video->id}}" alt=""
         class="w-25">
         <p class="text-xl">{{$video->title}}</p>
         <p>
          <span>{{$video->views}} views</span>
          <span>{{$video->created_at}}</span>   
         </p>
    </div>  
   </a>
  @empty
   <p class="text-xl text-red-600 m-3">no videos found like {{$search}}</p>
  @endforelse    
</div>    