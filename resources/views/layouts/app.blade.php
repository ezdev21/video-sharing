<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Video Sharing</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link rel="icon" href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngaaa.com%2Fdetail%2F480377&psig=AOvVaw2IjW_JFrfS-HJold-T9fqR&ust=1624971104119000&source=images&cd=vfe&ved=0CAcQjRxqFwoTCNjS3qKvuvECFQAAAAAdAAAAABAD">
    <!-- Styles -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
 <div id="app" class="">
  <form id="logout-form" action="{{ route('logout') }}" method="POST" class="hidden">
    @csrf
  </form>
  <div>
   <navigation-component @auth user-id="{{auth()->user()->id}}"@endauth/>
  </div>
  <main class="lg:py-4 xl:py-4 2xl:py-4">
    @yield('content')
  </main>
 </div>
</body>
</html>
