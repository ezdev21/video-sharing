@extends('layouts.app')
@section('content')
 @guest
 <p>sign in and create channel first to upload video
   <a href="{{route('login')}}" class="text-xl no-undeline text-white bg-red-600 p-1 rounded">Login</a></p>
 @else
 @if (Auth::user()->channel)
 <div class="bg-blue-100 m-auto p-5 w-1/2 rounded-2xl">
       <p class="text-2xl font-semibold text-center mb-3">upload a new video here</p>
       <form method="post" action="{{route('video.store')}}" enctype="multipart/form-data">
         @csrf
         <input type="hidden" name="userId" value="{{Auth::user()->id}}">
         <input type="text" name="title" placeholder="video title" required
         class="m-2 border-2 rounded-lg border-gray-300 w-full px-3 py-2 text-xl">
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
         <textarea name="description" id="" class="p-2 w-full m-auto h-40 focus:outline-none text-xl rounded-xl border-2 border-gray-300 my-2"></textarea>
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