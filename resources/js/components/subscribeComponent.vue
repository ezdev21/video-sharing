<template>
  <div>
   <div class="">
    <button @click="subscribe" class=" text-xl  py-1 px-2 rounded"
    :class="[subscribed? 'bg-gray-400 text-gray-100' : 'bg-red-600 text-white']"
    >{{subscribeText}}</button>
   </div>
  <div v-if="subscribing" class="fixed z-20 bottom-1/3 left-1/3 bg-white p-10 flex flex-col justify-center items-center rounded-xl">
  <button @click="subscribing=false" class="absolute top-0 right-0 text-4xl px-3 text-gray-600 hover:text-red-500">x</button>
  <p class="text-2xl">want to subscribe this channel ?</p>
  <p class="text-xl">sign in to subscribe this channel</p>
  <p class="m-auto"><a href="/login" class="text-2xl text-primary">sign in</a></p>
  </div> 
  <div v-if="subscribing" @click="subscribing=false" class="fixed -inset-full opacity-70 bg-black z-10"></div>
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