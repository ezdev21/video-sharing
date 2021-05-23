@extends('layouts.app')
@section('content')
  @auth
  <div class="w-1/2 m-auto bg-gray-200 p-5 rounded-xl">
    <p class="text-3xl font-semibold text-center">create your channel</p>
      <form method="POST" action="{{route('channel.store')}}" enctype="multipart/form-data">
        {{csrf_field()}}
        <input type="hidden" name="user" value="{{Auth::user()->id}}">
        <label for="name" class="text-xl">channel name</label>
        <input type="text" name="name" placeholder="channel name" required
        class="block h-10 text-xl rounded border-2 border-gray-500 w-full">
        @if ($errors->has('name'))
         <p class="text-xl text-red-600">{{$errors->first('name')}}</p>
        @endif
        <label for="cover" class="text-xl">channel profile picture</label>
        <input type="file" name="cover" required
        class="block text-xl">
        @if ($errors->has('cover'))
         <p class="text-xl text-red-600">{{$errors->first('cover')}}</p>
        @endif
        <label for="description" class="text-xl">channel description here</label>
        <textarea name="description" id="" cols="60" rows="10"
        class="w-full block rounded-xl border-2 border-gray-500"></textarea>
        <input type="submit" value="create channel"
        class="text-white bg-red-700 text-xl rounded m-2 p-2">
      </form>
  </div>
  @else
  <a href="{{route('login')}}" class="text-2xl no-underline"
  >login first to create channel</a>    
  @endauth  
@endsection