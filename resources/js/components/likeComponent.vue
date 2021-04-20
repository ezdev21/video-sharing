<template>
<button @click="like" class="[bg-yellow-700,bg-gray-300 : liked]">{{button}}</button>
</template>
<script>
export default {
    props:['userId','videolId'],
    data(){
        return{
          button:'like',
          liked:false
        }
    },
    mounted(){
      axios.get('api/videoId/userId')
      .then(res=>{
          liked=res.data.liked;
      })
      .catch(err=>{
          console.log('error fetching data');
      });
    },
    methods:{
        subscribe(){
            axios.post('/api/suscribe',{this.userId,this.channelId})
            .then(res=>{
             if(subscribed){
              this.buttonText=this.buttonText+'id';
             }   
             this.subscribed=!this.subscribed;
            })
        }
    }

}
</script>