@extends('layouts.app')
@section('content')
    <div>
        <form method="post" action="{{route('channel.store')}}">
          <input type="hidden" name="user" value="{{Auth::user()}}">
          <input type="text" name="name" placeholder="channel name" required>
          <input type="file" name="profile" required>
          <textarea name="description" id="" cols="60" rows="10"></textarea>
        </form>
    </div>
@endsection