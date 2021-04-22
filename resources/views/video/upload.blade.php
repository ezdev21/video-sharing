@extends('layouts.app')
@section('content')
    <div>
        <form method="post" action="{{route('video.store')}}" enctype="multipart/form-data">
          @csrf
          <input type="text" name="title" placeholder="video title" required>
          @if ($errors->has('title'))
            <p>{{$errors->name('title')->first()}}</p>
          @endif
          <input type="file" name="cover" required>
          @if ($errors->has('cover'))
            <p>{{$errors->name('cover')->first()}}</p>
          @endif
          <input type="file" name="video" required>
          @if ($errors->has('video'))
            <p>{{$errors->name('video')->first()}}</p>
          @endif
          <input type="submit" value="upload">
        </form>
    </div>
@endsection