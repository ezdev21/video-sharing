@extends('layouts.app')
@section('content')
  @auth
  <div class="w-1/2 m-auto bg-blue-100 p-5 rounded-xl">
    <p class="text-3xl font-semibold text-center">create your channel</p>
      <form method="POST" action="{{route('channel.store')}}" enctype="multipart/form-data">
        {{csrf_field()}}
        <input type="hidden" name="user" value="{{Auth::user()->id}}">
        <label for="name" class="text-xl">channel name</label>
        <input type="text" name="name" placeholder="channel name" required
        class="block m-2 py-2 px-3 text-xl rounded-lg border-2 border-gray-300 w-full">
        @if ($errors->has('name'))
         <p class="text-xl text-red-600">{{$errors->first('name')}}</p>
        @endif
        <label for="cover" class="text-xl">channel profile picture</label>
        <input type="file" name="cover" required
        class="m-2 block text-xl">
        @if ($errors->has('cover'))
         <p class="text-xl text-red-600">{{$errors->first('cover')}}</p>
        @endif
        <label for="description" class="text-xl">channel description here</label>
        <textarea name="description" id=""
        class="w-full my-2 h-40 mx-auto focus:outline-none p-2 text-xl rounded-xl border-2 border-gray-300"></textarea>
        <input type="submit" value="create channel"
        class="text-white bg-red-700 text-xl rounded-lg m-2 p-2">
      </form>
  </div>
  @else
  <a href="{{route('login')}}" class="text-2xl no-underline"
  >login first to create channel</a>    
  @endauth  
@endsection