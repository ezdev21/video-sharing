<template>
<button @click="disLike" class="[bg-yellow-700,bg-gray-300 : liked]">dislike</button>
</template>
<script>
export default {
    props:['userId','videolId'],
    data(){
        return{
          disliked:false
        }
    },
    mounted(){
      axios.get('api/dislike/videoId/userId',{this.videoId,this.userId})
      .then(res=>{
          disliked=res.data.disliked;
      })
      .catch(err=>{
          console.log('error fetching data');
      });
    },
    methods:{
        subscribe(){
            axios.post('/api/like/videoId/userId',{this.userId,this.channelId})
            .then(res=>{ 
             this.disliked=!this.disliked;
            })
        }
    }

}
</script>