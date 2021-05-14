<template>
  <div>
   <div v-if="channels.length" class="felx">
    <div v-for="channel in channels" :key="channel.id" class="felx-initial">
     <img :src="channel.imagePath" alt="" class="w-12 h-12 rounded-full ">
     <p>{{channel.name}}</p>
     <p>{{channel.subscribers}} subscribers</p>
     <p v-if="user.id">
      <subscribe-component userId="" channelId="this.channel.id"/>
     </p>
    </div>
   </div>
   <div v-else>
    <p class="text-2xl">this channel des not have featured channel</p>
   </div>
  </div>     
</template>
<script>
import subscribeComponent from './components/subscribeComponent';
export default {
   components:{
    'subscribe-componet' :subscribeComponent
   },
   props:[],
   data(){
    return{
     channel:{
       imagePath:'/storage/channelCover/'+this.channel.id,      
     },
     channels:[]
    }      
   },
   mounted(){
    axios.get('/channel/community',{params:{}})
         .then(res=>{
           this.channels=res.data.channels;
         })
         .catch(err=>{

         });      
   }    
}
</script>