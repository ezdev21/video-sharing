<template>
<button @click="like" class="bg-green-700 text-xl py-1 px-4 text-white" :style="liked? 'text-grey-900 text-grey-900' :''">
  {{likeText}}</button>
</template>
<script>
export default {
    props:['userid','videoid'],
    data(){
        return{
          liked:false,
          likeText:'like'
        }
    },
    mounted(){
      axios.get('/video/like/'+this.videoid+'/'+this.userid)
      .then(res=>{
          this.liked=res.data.liked;
          if(this.liked){
            this.likeText='liked'
          }
      })
      .catch(err=>{
        console.log('error fetching like data');
      });
    },
    methods:{
        like(){
            axios.post('video/like/'+this.videoid+'/'+this.userid)
            .then(res=>{ 
             this.liked=!this.liked;
               this.likeText=='like' ? this.likeText='liked' : this.likeText='like';
               console.log(res.data);
            })
            .catch(err=>{
              console.log('error in posting data to like');
              console.log(err);
            })
        }
    }

}
</script>