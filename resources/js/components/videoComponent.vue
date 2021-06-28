<template>
 <div>
  <div>
    <div v-for="video in videos" :key="video.id">
      <a href="">
       <div>
        <img :src="'/storage/videos/'+video.cover" class="w-60">
         <div>
          <p>{{video.title}}</p>
          <p>{{video.views}}</p>
          <p>{{video.description}}</p>    
         </div>    
       </div>   
      </a>
    </div>
  </div>
  <div>

  </div>
 </div>
</template>
<script>
export default{
 data(){
  return{
    channelId:null,
    videos:[]  
  }   
 },
 mounted(){
   this.channelId=this.$route.params.channelId;
   axios.get('/channel/videos',{params:{channelId:this.channelId}})
        .then(res=>{
          this.videos=resw.data.videos;  
        })   
 }  
}
</script>