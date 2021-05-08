<template>
<button @click="dislike" class="bg-green-700 text-xl py-1 px-4 text-white" :style="[liked? 'text-grey-900 text-grey-900':'']">
  {{dislikeText}}</button>
</template>
<script>
export default {
    props:['userid','videoid'],
    data(){
        return{
          disliked:false,
          dislikeText:'dislike'
        }
    },
    mounted(){
      axios.get('video/dislike/videoId/userId',{videoId:this.videoid,userId:this.userid})
      .then(res=>{
          this.disliked=res.data.disliked;
          if(this.disliked){
            this.dislikeText='disliked'
          }
      })
      .catch(err=>{
          console.log('error fetching dislike data');
      });
    },
    methods:{
        dislike(){
            axios.post('video/dislike/videoId/userId',{VideoId:this.userid,channelId:this.channelid})
            .then(res=>{ 
             this.liked=!this.liked;
             if(this.liked){
               this.dislikeText='disliked';
             }
            })
            .catch(err=>{
              console.log('error in posting data to dislike');
            })
        }
    }

}
</script>