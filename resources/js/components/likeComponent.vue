<template>
<button @click="like" class="[bg-yellow-700,bg-gray-300 : liked]">like</button>
</template>
<script>
export default {
    props:['userId','videolId'],
    data(){
        return{
          liked:false
        }
    },
    mounted(){
      axios.get('api/like/videoId/userId',{this.videoId,this.userId})
      .then(res=>{
          liked=res.data.liked;
      })
      .catch(err=>{
          console.log('error fetching data');
      });
    },
    methods:{
        subscribe(){
            axios.post('/api/like/videoId/userId',{this.userId,this.channelId})
            .then(res=>{ 
             this.liked=!this.liked;
            })
        }
    }

}
</script>