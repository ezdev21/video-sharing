@extends('layouts.app')
@section('content')
    <div>
        <form method="post" action="{{route('video.store')}}" enctype="multipart/form-data">
          @csrf
          <input type="text" name="title" placeholder="video title" required>
          <input type="file" name="cover" required>
          <input type="file" name="video" required>
          <input type="submit" value="upload">
        </form>
    </div>
@endsection