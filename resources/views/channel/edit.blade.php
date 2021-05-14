@extends('layouts.app')
@section('content')
<div>
 <p class="mx-5 text-2xl">Edit your channel here</p>
 <form method="POST" action="{{route('channel.update')}}">
  {{ csrf_field() }}
  @patch
  <input type="hidden" value="{{$channel->id}}">
  <label for="name" class="text-xl">channel name</label>
  <input type="text" name="channel" value="{{$channel->name}}" required 
    class="h-10 border-2 border-gray-500 rounded">
  <label for="cover" class="text-xl">channel profile picture</label>
  <img src="/storage/channelCover/{{$channel->cover}}" alt="" width="100px">
  <input type="file" name="cover" class="text-xl m-1">
  <label for="background" class="text-xl">channel background</label>
  <img src="/storage/channelBackground/{{$channel->background}}" alt="" width="100px">
  <input type="file" name="background" class="text-xl">
  <label for="description">description</label>
  <textarea name="description" id="" cols="60" rows="10">{{$channel->description}}</textarea>
  <input type="submit" value="edit" class="bg-red-600 text-xl text-white p-1 m-1">
 </form>         
</div>  
@endsection