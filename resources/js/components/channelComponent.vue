<template>
  <div class="p-3 m-3">
   <router-link class="text-2xl text-bold px-3 mx-1" active-class="border-gray-500 border-b-3" :to="{name:'channelVideos',params:{channelId:channelId}}">Videos</router-link>
   <router-link class="text-2xl text-bold px-3 mx-1" active-class="border-gray-500 border-b-3" :to="{name:'playlists',params:{channelId:channelId}}">Playlists</router-link>
   <router-link class="text-2xl text-bold px-3 mx-1" active-class="border-gray-500 border-b-3" :to="{name:'channels',params:{channelId:channelId}}">Channels</router-link>
   <router-link class="text-2xl text-bold px-3 mx-1" active-class="border-gray-500 border-b-3" :to="{name:'community',params:{channelId:channelId}}">Community</router-link>
   <router-link class="text-2xl text-bold px-3 mx-1" active-class="border-gray-500 border-b-3" :to="{name:'about',params:{channelId:channelId}}">About</router-link>
   <router-link class="text-2xl text-bold px-3 mx-1" active-class="border-gray-500 border-b-3" :to="{name:'search',params:{channelId:channelId}}">Search</router-link>
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