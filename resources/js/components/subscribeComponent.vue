<template>
  <button @click="subscribe" class="bg-red-600 text-xl text-white py-1 px-2 rounded"
  :class="subscribed? 'bg-gray-300 text-black' : ''"
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
             this.subscribeText='subscribed';
          }
      })
      .catch(err=>{
        
      });
    },
    methods:{
        subscribe(){
            axios.post('/channel/subscribe',{userId:this.userId,channelId:this.channelId})
            .then(res=>{
             this.subscribed=!this.subscribed; 
             this.subscribeText=='subscribe' ? this.subscribeText='subscribed' : this.subscribeText='subscribe';
            })
            .catch(err=>{
              
            });
        }
    }

}
</script>