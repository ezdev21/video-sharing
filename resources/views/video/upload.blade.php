@extends('layouts.app')
@section('content')
 @guest
 <p class="text-2xl m-2">sign in and create channel first to upload video
   <a href="{{route('login')}}" class="no-undeline text-white bg-red-500 p-1 rounded">sign in</a></p>
 @else
 @if (Auth::user()->channel)
 <div class="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/2 bg-blue-100 my-3 mx-auto p-5 rounded-2xl">
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
         class="block my-2 mx-auto px-3 rounded-lg h-10 text-xl bg-red-600 text-white">
       </form>
   </div>  
 @else
   <a href="{{route('channel.create',Auth::user()->id)}}"
    class="text-2xl no-undeline">create channel first</a>  
 @endif    
 @endguest   
@endsection