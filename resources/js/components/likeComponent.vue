<template>
<div class="inline">
 <button @click="like" class="bg-green-700 text-xl py-1 px-4 text-white" :style="liked? 'text-grey-900 text-grey-900' :''">
  {{likeText}}</button>
  <button @click="dislike" class="bg-yellow-500 text-xl py-1 px-4 text-white" :style="liked? 'text-grey-900 text-grey-900' :''">
  {{dislikeText}}</button>
</div>
</template>
<script>
export default {
    props:['userid','videoid'],
    data(){
        return{
          liked:false,
          likeText:'like',
          dislikeText:'dislike'
        }
    },
    mounted(){
      axios.get('/video/like',{params:{videoId:this.videoid,userId:this.userid}})
      .then(res=>{
          this.liked=res.data.liked;
          if(this.liked){
            this.likeText='liked'
          }
          console.log('get like data succesfull');
      })
      .catch(err=>{
        console.log('error in fetching like data');
      });
    },
    methods:{
        like(){
            axios.post('/video/like',{videoId:this.videoid,userId:this.userid})
            .then(res=>{ 
              this.liked=!this.liked;
              this.likeText=='like' ? this.likeText='liked' : this.likeText='like';
              console.log('post like data successful');
            })
            .catch(err=>{
              console.log('error in post like data');
            });

        }
    }

}
</script>