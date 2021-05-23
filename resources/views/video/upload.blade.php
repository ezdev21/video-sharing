@extends('layouts.app')
@section('content')
 @guest
 <p>sign in and create channel first to upload video
   <a href="{{route('login')}}" class="text-xl no-undeline text-white bg-red-600 p-1 rounded">Login</a></p>
 @else
 @if (Auth::user()->channel)
 <div class="bg-gray-200 m-auto p-3 w-1/2 rounded-2xl">
       <p class="text-2xl font-semibold text-center mb-3">upload a new video here</p>
       <form method="post" action="{{route('video.store')}}" enctype="multipart/form-data">
         @csrf
         <input type="hidden" name="userId" value="{{Auth::user()->id}}">
         <input type="text" name="title" placeholder="video title" required
         class="m-2 border-2 rounded border-gray-500 w-full h-10 text-xl">
         @if ($errors->has('title'))
           <p>{{$errors->first('title')}}</p>
         @endif
         <label for="cover" class="text-xl">video cover photo</label>
         <input type="file" name="cover" required
         class="block text-xl m-2"> 
         @if ($errors->has('cover'))
           <p>{{$errors->first('cover')}}</p>
         @endif
         <label for="video" class="text-xl">video</label>
         <input type="file" name="video" required 
         class="block text-xl m-2">
         @if ($errors->has('video'))
           <p>{{$errors->first('video')}}</p>
         @endif
         <p class="text-xl font-bold">Description</p>
         <textarea name="description" id="" cols="60" rows="10" class="p-2 w-full text-xl rounded-xl border-2 border-gray-500 m-2"></textarea>
         <input type="submit" value="upload"
         class="m-2 px-3 rounded-lg h-10 text-xl bg-red-600 text-white">
       </form>
   </div>  
 @else
   <a href="{{route('channel.create',Auth::user()->id)}}"
    class="text-2xl no-undeline">create channel first</a>  
 @endif    
 @endguest   
@endsection