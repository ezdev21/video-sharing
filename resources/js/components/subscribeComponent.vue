<template>
<button @click="suscribe" class="[bg-yellow-700,bg-gray-300 : subscribed]">{{button}}</button>
</template>
<script>
export default {
    props:['userId','channelId'],
    data(){
        return{
          button:'subscribe',
          subscribed:false
        }
    },
    mounted(){
       axios.get('api/channelId/userId')
      .then(res=>{
          subscribed=res.data.subscribed;
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