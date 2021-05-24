@extends('layouts.app')
@section('content')
<div class="w-1/2 m-auto bg-gray-300 rounded-xl p-2">
 <p class="mx-5 text-2xl text-center">Edit your channel here</p>
 <form method="POST" action="{{route('channel.update')}}">
  @method('patch')
  {{ csrf_field() }}
  <input type="hidden" value="{{$channel->id}}">
  <label for="name" class="text-2xl text-center block">channel name</label>
  <input type="text" name="channel" value="{{$channel->name}}" required 
    class="block w-3/4 m-auto p-2 text-xl border-2 border-gray-500 rounded">
  <label for="cover" class="text-2xl text-center block">channel profile picture</label>
  <img src="/storage/channelCover/{{$channel->cover}}" alt="" width="100px">
  <input type="file" name="cover" class="text-xl m-1">
  <label for="background" class="text-2xl block text-center">channel background</label>
  <img src="/storage/channelBackground/{{$channel->background}}" alt="" width="100px">
  <input type="file" name="background" class="text-xl">
  <label for="description" class="text-2xl block text-center">description</label>
  <textarea name="description" class="text-xl rounded-xl block m-auto w-5/6 h-40 p-2 focus:outline-none border-2 border-gray-300">
    {{$channel->description}}</textarea>
  <input type="submit" value="edit" class="block my-2 mx-auto rounded-lg bg-blue-600 text-xl text-white py-1 px-3">
 </form>         
</div>  
@endsection