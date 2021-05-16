@extends('layouts.app')
@section('content')
@include('channel.show')
<div class="flex">
 <div>
  <p class="uppercase text-xl">description</p>
  <p>{{$channel->description}}</p>    
 </div>
 <div>
  <p class="uppercase text-xl">stats</p>
  <p>joined {{$channel->created_at}}</p>
  <p>{{$channel->subscribes->count()}} subscribers</p>
 </div>
 <div>
  <p class="uppercase text-xl">details</p>
  <p>{{$channel->location}}</p>
 </div>
 <div>
    <p class="uppercase text-xl">links</p>
    @forelse ($channel->videos as $link)
     <a href="{{$link->adress}}" class="text-xl no-undeline text-gray-900"
        >{{$link->name}}</a> 
    @empty 
    <p>this channel has no links</p>   
    @endforelse
 </div>
</div>    
@endsection