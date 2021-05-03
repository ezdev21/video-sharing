@extends('layouts.app')
@section('content')
    <div class="bg-gray-400 p-3">
        <form method="post" action="{{route('video.store')}}" enctype="multipart/form-data">
          @csrf
          {{--<input type="hidden" name="userId" value="{{Auth::user()->id}}">--}}
          <input type="text" name="title" placeholder="video title" required
          class="block w-1/3 h-10 text-xl m-2">
          @if ($errors->has('title'))
            <p>{{$errors->name('title')->first()}}</p>
          @endif
          <label for="cover">video cover photo</label>
          <input type="file" name="cover" required
          class="block text-xl m-2"> 
          @if ($errors->has('cover'))
            <p>{{$errors->name('cover')->first()}}</p>
          @endif
          <label for="video">video</label>
          <input type="file" name="video" required
          class="block text-xl m-2">
          @if ($errors->has('video'))
            <p>{{$errors->name('video')->first()}}</p>
          @endif
          <p class="text-xl font-bold">Description</p>
          <textarea name="description" id="" cols="60" rows="10" class="block text-xl rounded-sm"></textarea>
          <input type="submit" value="upload"
          class="m-2 px-3 rounded-sm h-10 text-xl bg-blue-900 text-white">
        </form>
    </div>
@endsection