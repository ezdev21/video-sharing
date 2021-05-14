<template>
  <button @click="subscribe" class="bg-red-600 text-xl text-white py-1 px-2 rounded"
  :class="{'bg-gray-300 text-black' : subscribed}"
  >{{subscribeText}}</button>
</template>
<script>
export default {
    props:['userid','channelid'],
    data(){
        return{
          subscribeText:'subscribe',
          subscribed:false,
          loggedin:true
        }
    },
    mounted(){
       axios.get('/channel/subscribe',{params:{channelId:this.channelid,userId:this.userid}})
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
            axios.post('/channel/subscribe',{params:{userId:this.userid,channelId:this.channelid}})
            .then(res=>{
             this.subscribed=!this.subscribed; 
             this.subscribeText=='subscribe' ? this.subscribeText='unsubscribe' : this.subscribeText='subscribe';
            })
            .catch(err=>{
              
            });
        }
    }

}
</script>