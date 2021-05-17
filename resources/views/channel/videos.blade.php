@include('channel.show')
<div class="block sm:flex md:flex lg:flex mx-2 p-2">
  @forelse ($channel->videos as $video)
  <div class="flex-initial m-2">
    <a href="{{route('video.watch',$video->id)}}">
      <img src="/storage/videoCover/{{$video->cover}}" alt="" width="200px">
      <p class="text-xl text-center">{{$video->title}}</p>
      <p class="text-md text-center">
        <span>{{$video->views}} views</span>
        <span>{{$video->created_at}}</span>
      </p>
    </a> 
  </div>
  @empty
    <p class="text-xl mx-2 text-red-700">this channnel has no videos yet</p>  
  @endforelse 
</div>