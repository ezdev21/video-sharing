<template>
<button @click="like" class="[bg-red-700 text-xl px-2,text-white]" :style="[liked? 'text-grey-900 text-grey-900':'']">
  {{likeText}}</button>
</template>
<script>
export default {
    props:['userid','videoid'],
    data(){
        return{
          liked:false,
          likeText:null
        }
    },
    mounted(){
      axios.get('api/like/videoId/userId',{videoId:this.videoid,userId:this.userid})
      .then(res=>{
          this.liked=res.data.liked;
          if(this.liked){
            this.likeText='liked'
          }
      })
      .catch(err=>{
          console.log('error fetching data');
      });
    },
    methods:{
        like(){
            axios.post('/api/like/videoId/userId',{VideoId:this.userid,channelId:this.channelid})
            .then(res=>{ 
             this.liked=!this.liked;
             if(this.liked){
               this.likeText='liked';
             }
            })
            .catch(err=>{
              console.log('error in posting data to like');
            })
        }
    }

}
</script>