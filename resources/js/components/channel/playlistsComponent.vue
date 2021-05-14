<template>
  <div>
   <div v-if="videos.length">
    <div v-for="playlist in playlists" :key="playlist.id" class="relative">
     <img :src="playlist.cover" alt="">
     <div class="opacity-0.5 absolute top-0 right-0 w-1/2 bg-black">{{playlist.totalPlaylist}}</div>
    </div>
   </div>
   <div v-else>
    <p class="text-xl">this channel has no playlists</p>
   </div>
  </div>     
</template>
<script>
export default {
  props:['channelId'],
  data(){
   return{
    playlist:{},
    playlists:[]      
   }      
  },
  mounted(){
    axios.get('/channel/playlists',{params:{channelId:this.channelId}})
         .then(res=>{
          this.playlists=res.data.playlist;
         })
         .catch(err=>{
             console.log('error in loading plalists');   
         });     
  }     
}
</script>