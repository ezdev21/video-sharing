<template>
  <div>
   <router-link class="uppercase text-2xl text-bold " to="/videos">videos</router-link>
   <router-link class="uppercase text-2xl text-bold " to="/playlistss">playlists</router-link>
   <router-link class="uppercase text-2xl text-bold " to="/channels">channels</router-link>
   <router-link class="uppercase text-2xl text-bold " to="/community">community</router-link>
   <router-link class="uppercase text-2xl text-bold " to="/about">about</router-link>
   <router-link class="uppercase text-2xl text-bold " to="/about">search</router-link>
   <router-view keep-alive></router-view>
  </div> 
</template>
<script>
export default {
     
}
</script>