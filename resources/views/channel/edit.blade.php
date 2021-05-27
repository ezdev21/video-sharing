@extends('layouts.app')
@section('content')
<div class="w-1/2 m-auto bg-blue-100 rounded-xl p-2">
 <p class="mx-5 text-3xl font-semibold text-center">Edit your channel here</p>
 <form method="POST" action="{{route('channel.update')}}" enctype="multipart/form-data">
  @method('patch')
  {{ csrf_field() }}
  <input type="hidden" name="channelId" value="{{$channel->id}}">
  <label for="name" class="text-2xl text-center block">channel name</label>
  <input type="text" name="name" value="{{$channel->name}}" required 
    class="block w-3/4 m-auto p-2 text-xl border-2 border-gray-500 rounded">
  @if ($errors->has('name'))
    <p class="text-xl text-red-600 w-max m-auto bg-red-50 my-2 px-2 rounded-lg">{{$errors->first('name')}}</p>
  @endif 
  <label for="cover" class="text-2xl text-center block">channel profile picture</label>
  <img src="/storage/channelCover/{{$channel->cover}}" class="w-40 m-auto">
  <input type="file" name="cover" class="text-xl m-1">
  @if ($errors->has('cover'))
    <p class="text-xl text-red-600 w-max m-auto bg-red-50 my-2 px-2 rounded-lg">{{$errors->first('cover')}}</p>
  @endif
  <label for="background" class="text-2xl block text-center">channel background</label>
  <img src="/storage/channelBackground/{{$channel->background}}" class="">
  <input type="file" name="background" class="text-xl">
  @if ($errors->has('background'))
    <p class="text-xl text-red-600 w-max m-auto bg-red-50 my-2 px-2 rounded-lg">{{$errors->first('background')}}</p>
  @endif
  <label for="description" class="text-2xl block text-center">description</label>
  <textarea name="description" class="text-xl rounded-xl block m-auto w-5/6 h-40 p-2 focus:outline-none border-2 border-gray-300">
    {{$channel->description}}</textarea>
  @if ($errors->has('description'))
    <p class="text-xl text-red-600 w-max m-auto bg-red-50 my-2 px-2 rounded-lg">{{$errors->first('description')}}</p>
   @endif  
  <input type="submit" value="Edit" class="block m-2 mx-auto rounded-lg bg-red-600 text-xl text-white py-2 px-5">
 </form>         
</div>  
@endsection