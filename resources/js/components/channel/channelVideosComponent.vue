<template>
  <div v-if="videos.length" class="m-2 p-2 flex">
    <div v-for="video in videos" :key="video.id" class="m-2">
     <a :href="'/video/watch/'+video.id">
      <img :src="'/storage/videoCover/'+video.cover" class="w-60">
      <p class="text-xl">{{video.title}}</p>
      <p class="text-md"><span>{{video.views}} views</span><span class="font-bold mx-1">.</span><span> {{video.date}}</span></p>
     </a>
   </div>
  </div>
  <div v-else>
   <p class="text-2xl mx-5">this channel has no videos</p>
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
             let m=date.getMonth();
             let months=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]
             let mon=months[m];
             let d=date.getDate();
             video.date=[mon,d,y].join(' ');
           })
          }); 
    }   
}
</script>