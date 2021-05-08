@extends('layouts.app')
@section('content')
@include('channel.show')
<div>
@forelse ($playlists as $playlist)
 <div class="relative">
  <img src="/storage/videoCovers/{{$playlist->videos->first()->id}}" alt=""
   class="w-25">
  <div class="absolute opacity-0.5 top-0 right-0 w-1/2 h-1/2">
   <span class="text-xl ">{{$playlist->videos->count()}}</span>
  </div>
  <p>{{$playlist->name}}</p>
  <p>updated {{$playlist->updated_at}}</p>
  <a href="" class="uppercase text-xl no-underline">view full playlist</a>    
 </div>   
@empty
 <p class="text-xl text-red-600 m-2">this channels has no playlists</p>   
@endforelse    
</div>    
@endsection