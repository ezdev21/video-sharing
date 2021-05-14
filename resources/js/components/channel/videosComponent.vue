<template>
  <div v-if="videos.length">
   <a :href="video.linkPath">
    <div v-for="video in videos" :key="video.id" class="">
     <img :src="video.imagePath" alt="" width="full">
     <p class="text-xl">{{video.name}}</p>
     <p>{{video.totalViews}} views . {{video.created_at}}</p>
   </div>
   </a>
  </div>
  <div v-else>
   <p class="text-xl">this channel has no videos</p>
  </div>     
</template>
<script>
export default {
    props:['channelId'],
    data(){
     return {
      video:{
       linkPath:'/video/watch/'+this.videoId,
       coverPath:'/storage/videoCover/'+this.videoId
      },
      videos:[]
     }      
    },
    mounted(){
     axios.get('/channel/videos',{params:{channelId:this.channelid}})
          .then(res=>{
           this.videos=res.data.videos;
          })
          .catch(err=>{
            console.log('error i loading videos');
          }); 
    }   
}
</script>