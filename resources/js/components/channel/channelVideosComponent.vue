<template>
  <div v-if="videos.length">
    <div v-for="video in videos" :key="video.id" class="">
     <img :src="'/storage/videoCover/'+video.cover" class="w-60">
     <p class="text-xl">{{video.title}}</p>
     <p>{{video.totalViews}} views . {{video.date}}</p>
   </div>
  </div>
  <div v-else>
   <p class="text-xl">this channel has no videos</p>
  </div>     
</template>
<script>
export default {
    data(){
     return {
      channelId:null,
      videos:[]
     }      
    },
    mounted(){
     this.channelId=this.$route.params.channelId; 
     axios.get('/channel/videos',{params:{channelId:this.channelId}})
          .then(res=>{
           this.videos=res.data.videos;
           this.videos.forEach(video=>{
             let date=new Date(video.created_at)
             let y=date.getFullYear();
             let m=date.getMonth()+1;
             let d=date.getDate();
             video.date=[y,m,d].join('-');
           })
          }); 
    }   
}
</script>