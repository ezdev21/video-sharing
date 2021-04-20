<template>
<button @click="suscribe" class="[bg-yellow-700,bg-gray-300 : subscribed]">{{button}}</button>
</template>
<script>
export default {
    props:['userId','channelId'],
    data(){
        return{
          button:'dislike',
          subscribed:false
        }
    },
    mounted(){
       axios.get('api/videoId/userId')
      .then(res=>{
          liked=res.data.disliked;
      })
      .catch(err=>{
          console.log('error fetching data');
      });
    },
    methods:{
        subscribe(){
            axios.post('/api/suscribe',{this.userId,this.channelId})
            .then(res=>{
             if(disliked){
              this.buttonText=this.buttonText+'id';
             }   
             this.subscribed=!this.subscribed;
            })
        }
    }

}
</script>