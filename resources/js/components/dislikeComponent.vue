<template>
<button @click="disLike" class="[bg-red-700 text-xl px-2,text-white]" :style="[liked? 'text-grey-900 text-grey-900':'']">
  {{disLikeText}}</button>
</template>
<script>
export default {
    props:['userid','videoid'],
    data(){
        return{
          disLiked:false,
          disLikeText:'dislike'
        }
    },
    mounted(){
      axios.get('api/disLike/videoId/userId',{videoId:this.videoid,userId:this.userid})
      .then(res=>{
          this.disLiked=res.data.liked;
          if(this.disliked){
            this.disLikeText='disliked'
          }
      })
      .catch(err=>{
          console.log('error fetching data');
      });
    },
    methods:{
         disLike(){
            axios.post('/api/like/videoId/userId',{VideoId:this.userid,channelId:this.channelid})
            .then(res=>{ 
             this.disLiked=!this.disLiked;
             if(this.disLiked){
               this.disLikeText='disliked';
             }
            })
            .catch(err=>{
              console.log('error in posting data to like');
            })
        }
    }

}
</script>