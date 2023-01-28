<template>
  <div v-if="videos.length" class="m-2 p-2 flex">
    <div v-for="video in videos" :key="video.id" class="m-2">
     <a :href="'/video/watch/'+video.id">
      <img :src="'/storage/videoCover/'+video.cover" class="w-60">
      <p class="text-xl">{{video.title}}</p>
      <p class="text-md"><span>{{video.views}} views</span><span class="font-bold mx-1">.</span><span> {{video.created_at}}</span></p>
     </a>
   </div>
  </div>
  <div v-else>
   <p class="text-2xl mx-5">this channel has no videos</p>
  </div>
</template>
<script setup>
let channelId=$ref(null)
let videos=$ref([])

onMounted(()=>{
    channelId=$route.params.channelId
    axios.get('/channel/videos',{params:{channelId:channelId}})
    .then(res=>{
      videos=res.data.videos
    })
})

</script>
