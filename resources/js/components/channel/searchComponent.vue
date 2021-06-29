<template>
 <div>
  <div>
  <input type="text" v-model="searchText"> 
  </div>
  <div v-if="searchedvideos.length">
   <div v-for="video in searchedVideos" :key="video.id" class="flex-initial">
    <img :src="video.imagePath" alt="" width="100px">
    <p>{{video.name}}</p>
    <p></p>
  </div>
  </div>
  <div v-else>
   <p v-if="searchText.length" class="text-xl">no videos matched your search {{searchtext}} in this channel</p>
  </div>
 </div>     
</template>
<script>
export default {
  props:['channelId'],
  data(){
   return{
      searchText:'', 
      videos:[]    
   }      
  },
  mounted(){
   axios.get('/channel/video/',{params:{channelId:this.channelId}})
        .then(res=>{
          this.videos=res.data.videos;     
        })
        .catch(err=>{
          console.log('error in loading search videos');
        });
  },
  computed:{

  }     
}
</script>