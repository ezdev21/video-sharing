<template>
  <div>
   <!-- <div v-if="channels.length" class="flex">
    <div v-for="channel in channels" :key="channel.id" class="felx-initial">
     <img :src="channel.imagePath" alt="" class="w-12 h-12 rounded-full ">
     <p>{{channel.name}}</p>
     <p>{{channel.subscribers}} subscribers</p> -->
     <!-- <p v-if="user.id">
      <subscribe-component :userId="user.id" :channelId="channel.id"/>
     </p> -->
    <!-- </div>
   </div>
   <div> -->
    <p class="text-2xl mx-5">this channel does not have featured channel</p>
   <!-- </div> -->
  </div>     
</template>
<script>
 //import subscribeComponent from './components/subscribeComponent.vue';
 export default {
  //  components:{
  //   'subscribe-component' : subscribeComponent,
  //  },
   data(){
    return{
     channels:[]
    }      
   },
   mounted(){
    axios.get('/channel/community',{params:{}})
         .then(res=>{
           this.channels=res.data.channels;
         })     
   }    
}
</script>