<template>
  <div class="p-1 m-1">
   <router-link class="text-2xl text-bold px-3" to="/videos">videos</router-link>
   <router-link class="text-2xl text-bold px-3" to="/playlists">playlists</router-link>
   <router-link class="text-2xl text-bold px-3" to="/channels">channels</router-link>
   <router-link class="text-2xl text-bold px-3" to="/community">community</router-link>
   <router-link class="text-2xl text-bold px-3" to="/about">about</router-link>
   <router-link class="text-2xl text-bold px-3" to="/search">search</router-link>
   <router-view keep-alive></router-view>
  </div> 
</template>
<script>
export default {
  props:['channelId'],
  data(){
    return {
      mainPath:'/channel/show/'+this.channelId+'/',
      videosPath:''
    }
  },
  mounted(){
    this.videosPath=this.mainPath+'videos';
  }   
}
</script>