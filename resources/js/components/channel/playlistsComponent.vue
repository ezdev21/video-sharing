<template>
  <div>
   <div v-if="playlists.length">
    <div v-for="playlist in playlists" :key="playlist.id" class="relative">
     <img :src="playlist.videos[0].cover" alt="">
     <div class="opacity-0.5 absolute top-0 right-0 w-1/2 bg-black">{{playlist.totalPlaylist}}</div>
    </div>
   </div>
   <div v-else>
    <p class="text-2xl mx-5">this channel has no playlists</p>
   </div>
  </div>     
</template>
<script>
export default {
  data(){
   return{
    channelId:null,
    playlists:[]      
   }      
  },
  mounted(){
    this.channelId=this.$route.params.channelId;
    axios.get('/channel/playlists',{params:{channelId:this.channelId}})
         .then(res=>{
          this.playlists=res.data.playlists;
         });    
  }     
}
</script>