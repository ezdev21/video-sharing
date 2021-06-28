<template>
  <div class="p-1 m-1">
   <router-link class="text-2xl text-bold px-3" :to="{name:'channelVideos',params:{channelId:channelId}}">videos</router-link>
   <router-link class="text-2xl text-bold px-3" :to="{name:'playlists',params:{channelId:channelId}}">playlists</router-link>
   <router-link class="text-2xl text-bold px-3" :to="{name:'channels',params:{channelId:channelId}}">channels</router-link>
   <router-link class="text-2xl text-bold px-3" :to="{name:'community',params:{channelId:channelId}}">community</router-link>
   <router-link class="text-2xl text-bold px-3" :to="{name:'about',params:{channelId:channelId}}">about</router-link>
   <router-link class="text-2xl text-bold px-3" :to="{name:'search',params:{channelId:channelId}}">search</router-link>
   <router-view keep-alive></router-view>
  </div> 
</template>
<script>
export default {
  props:['channelId'],
  data(){
    return {
      
    }
  },
  mounted(){
    this.videosPath=this.mainPath+'videos';
  }   
}
</script>