<template>
 <button @click="subscribe" id="subscribe" 
 class="[bg-yellow-700 text-xl-white,bg-gray-300 text-xl-black: subscribed,]"
 >{{button}}</button>
</template>
<script>
export default {
    props:['userid','channelid'],
    data(){
        return{
          button:'subscribe',
          subscribed:false
        }
    },
    mounted(){
       axios.get('api/subscribe/channelId/userId')
      .then(res=>{
          subscribed=res.data.subscribed;
          if(this.subscribed){
             this.button='unsubscribe';
          }
      })
      .catch(err=>{
          console.log('error fetching data');
      });
    },
    methods:{
        subscribe(){
            axios.post('/api/suscribe/userId/channelId',{this.userid,this.channelid})
            .then(res=>{
             if(subscribed){
              this.buttonText='un'+this.buttonText;
             }   
             this.subscribed=!this.subscribed;
            })
            .catch(err=>{
              console.log('error in sending post subscribe');
            });
        }
    }

}
</script>