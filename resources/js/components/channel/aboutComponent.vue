<template>
 <div>
  <div>
  <p class="text-2xl">Description</p>
  <p>{{channel.description}}</p>
  </div>
  <div>
  <p class="text-2xl">Details</p>
  <p>Location {{channel.location}}</p>
  </div>
  <div>
  <p class="text-2xl">Links</p>
   <div v-for="link in channel.links" :key="link.key">
     <a href="link.">{{link.name}}</a>
   </div>
  </div>
  <div>
   <p class="text-2xl">Stats</p>
   <p>joined {{channel.created_at}}</p>
   <p>{{channel.subscribers}} subscribers</p>
   <p>{{channel.views}}</p>
  </div>
 </div>      
</template>
<script>
export default {
   prosp:['channelId'],
   data(){
    return{
     channel:{
     id:'',
     description:'',
     created_at:'',
     location:'',
     links:'',
     views:'',
     subscribers:''
    }       
    }     
   },
   mounted(){
     axios.get('/channel/about',{params:{channelId:this.channelId}})
       .then(res=>{
         this.channnel=res.data.channel;
       })
       .catch(err=>{

       });     
   },    
}
</script>