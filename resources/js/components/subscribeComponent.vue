<template>
  <button @click="subscribe" class="absolute top-0 right-0 bg-red-600 text-xl text-white py-1 px-2 rounded"
  :class="subscribed? 'bg-gray-300 text-xl-black':''"
  >{{buttonText}}</button>
</template>
<script>
export default {
    props:['userid','channelid'],
    data(){
        return{
          buttonText:'subscribe',
          subscribed:false,
          channelId:null,
          userId:null,
          loggedin:true
        }
    },
    mounted(){
       axios.get('/channel/subscribe/',{userId:this.userid,channelId:this.channelid})
      .then(res=>{
          this.subscribed=res.data.subscribed;
          if(this.subscribed){
             this.buttonText='unsubscribe';
          }
      })
      .catch(err=>{
          console.log('error fetching subscribe data');
          console.log('channel id '+this.channelid+' user id '+this.userid);
      });
    },
    methods:{
        subscribe(){
            axios.post('channel/subscribe',{userId:this.userid,channelId:this.channelid})
            .then(res=>{
             this.subscribed=!this.subscribed; 
             if(this.subscribed){
                 this.buttontext='unsubscribe';
             }
            })
            .catch(err=>{
              console.log(err);
            });
        }
    }

}
</script>