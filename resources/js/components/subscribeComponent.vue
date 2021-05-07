<template>
 <button @click="subscribe" class="bg-yellow-700 text-xl text-white"
 :style="[subscribed? 'bg-gray-300 text-xl-black':'']"
 >{{buttonText}}</button>
</template>
<script>
export default {
    data(){
        return{
          buttonText:'subscribe',
          subscribed:false,
          channelId:null,
          userId:null
        }
    },
    mounted(){
       axios.get('api/subscribe/channelId/userId')
      .then(res=>{
          this.subscribed=res.data.subscribed;
          if(this.subscribed){
             this.buttonText='unsubscribe';
          }
      })
      .catch(err=>{
          console.log('error fetching subscribe data');
      });
    },
    methods:{
        subscribe(){
            axios.post('/api/suscribe/channelId/userId',{userId:this.userId,channelId:this.channelId})
            .then(res=>{
             this.subscribed=!this.subscribed; 
             if(this.subscribed){
                 this.buttontext='unsubscribe';
             }
            })
            .catch(err=>{
              console.log('error in sending post subscribe');
            });
        }
    }

}
</script>