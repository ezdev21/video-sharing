<template>
  <button @click="subscribe" class="absolute top-0 right-0 bg-red-600 text-xl text-white py-1 px-2 rounded"
  :class="subscribed? 'bg-gray-300 text-xl-black':''"
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
          console.log('get subscribe successful');
      })
      .catch(err=>{
        console.log('err in fetching subscribe data');
      });
    },
    methods:{
        subscribe(){
            axios.post('/channel/subscribe',{userId:this.userid,channelId:this.channelid})
            .then(res=>{
             this.subscribed=!this.subscribed; 
             this.subscribeText=='subscribe' ? this.subscribeText='unsubscribe' : this.subscribeText='subscribe';
            })
            .catch(err=>{
              console.log('error in posting subscribe data');
            });
        }
    }

}
</script>