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
   <p>{{channel.views}} views</p>
  </div>
 </div>
</template>
<script setup>
defineProps({channelId})
let channel=$ref({})

onMounted(()=>{
    axios.get('/channel/about',{params:{channelId:channelId}})
    .then(res=>{
        channnel=res.data.channel
    })
    .catch(err=>{

    })
})
</script>
