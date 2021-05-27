<template>
  <div>
   <div>
    <button @click="subscribe" class="bg-red-600 text-xl text-white py-1 px-2 rounded"
    :class="{'bg-gray-300 text-black' : subscribed}"
    >{{subscribeText}}</button>
   </div>
    <div v-if="subscribing" class="absolute inset-0 z-20 flex justify-center items-center">
     <div class="fixed bg-white p-10 flex flex-col justify-center items-center rounded-xl">
      <button @click="subscribing=false" class="absolute top-0 right-0 text-4xl px-3 text-red-500">x</button>
      <p class="text-2xl">want to subscribe this channel ?</p>
      <p class="text-xl">sign in to subscribe this channel</p>
      <p class="m-auto"><a href="/login" class="text-2xl text-primary">sign in</a></p>
     </div> 
  </div> 
  <div v-if="subscribing" @click="subscribing=false" class="absolute -inset-full opacity-50 bg-black z-10"></div>
  </div>
</template>
<script>
export default {
    props:['userId','channelId'],
    data(){
        return{
          subscribeText:'subscribe',
          subscribed:false,
          subscribing:false,
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
          if(this.userId){
           axios.post('/channel/subscribe',{userId:this.userId,channelId:this.channelId})
            .then(res=>{
             this.subscribed=!this.subscribed; 
             this.subscribeText=='subscribe' ? this.subscribeText='subscribed' : this.subscribeText='subscribe';
            })
            .catch(err=>{
              
            });
          }
          else{
           this.subscribing=true;
          }  
        }
    }

}
</script>