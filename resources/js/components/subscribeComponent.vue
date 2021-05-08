<template>
 <div>
  <button @click="subscribe" class="bg-red-600 text-xl text-white py-1 px-2 rounded"
  :class="subscribed? 'bg-gray-300 text-xl-black':''"
  >{{buttonText}}</button>
  <div>
   <p class="text-xl">want to subscribe to this channel?</p>
   <p>sign in to subscribe this channel</p>
   <a href="/login" class="uppercase text-xl m-2 text-green-600">sign in</a>   
  </div>   
 </div>
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