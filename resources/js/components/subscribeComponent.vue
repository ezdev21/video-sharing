<template>
  <button @click="subscribe" class="bg-red-600 text-xl text-white py-1 px-2 rounded"
  :class="{'bg-gray-300 text-black' : subscribed}"
  >{{subscribeText}}</button>
</template>
<script>
export default {
    props:['userId','channelId'],
    data(){
        return{
          subscribeText:'subscribe',
          subscribed:false,
          loggedin:true
        }
    },
    mounted(){
       axios.get('/channel/subscribe',{params:{channelId:this.channelId,userId:this.userId}})
      .then(res=>{
          this.subscribed=res.data.subscribed;
          if(this.subscribed){
             this.subscribeText='unsubscribe';
          }
      })
      .catch(err=>{
        
      });
    },
    methods:{
        subscribe(){
            console.log('user_id '+this.userId+' channel_id '+this.channelId);
            axios.post('/channel/subscribe',{userId:this.userId,channelId:this.channelId})
            .then(res=>{
             this.subscribed=!this.subscribed; 
             this.subscribeText=='subscribe' ? this.subscribeText='unsubscribe' : this.subscribeText='subscribe';
             console.log(res.data);
            })
            .catch(err=>{
              
            });
        }
    }

}
</script>