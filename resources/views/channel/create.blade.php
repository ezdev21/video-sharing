@extends('layouts.app')
@section('content')
    <div class="bg-gray-300 -m-5 p-2">
      <p class="text-3xl mt-5 ml-10 text-green-800 text-bold">create your channel</p>
        <form method="POST" action="{{route('channel.store')}}">
          {{csrf_field()}}
          <input type="hidden" name="user" value="{{Auth::user()}}">
          <input type="text" name="name" placeholder="channel name" required
          class="block w-50 h-10 text-xl">
          <input type="file" name="profile-picture" required
          class="block text-xl">
          <textarea name="description" id="" cols="60" rows="10"
          class="w-50 block"></textarea>
          <input type="submit" value="create channel"
          class="text-white bg-red-700 text-xl rounded p-2 ml-10">
        </form>
    </div>
@endsection