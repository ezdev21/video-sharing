<template>
<button @click="like" id="like" class="[bg-yellow-700,bg-gray-300 : liked]">like</button>
</template>
<script>
export default {
    props:['userid','videoid'],
    data(){
        return{
          liked:false
        }
    },
    mounted(){
      axios.get('api/like/videoId/userId',{this.videoid,this.userid})
      .then(res=>{
          liked=res.data.liked;
          if(this.liked){
            document,getElementById('like').inerText='dislike';
          }
      })
      .catch(err=>{
          console.log('error fetching data');
      });
    },
    methods:{
        subscribe(){
            axios.post('/api/like/videoId/userId',{this.userid,this.channelid})
            .then(res=>{ 
             this.liked=!this.liked;
            })
        }
    }

}
</script>