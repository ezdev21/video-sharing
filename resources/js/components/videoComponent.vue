<template>
 <div>
  <div>
    <div v-for="video in videos" :key="video.id">
      <a href="">
       <div>
        <img :src="'/storage/videos/'+video.cover" class="w-60">
         <div>
          <p>{{video.title}}</p>
          <p>{{video.views}}</p>
          <p>{{video.description}}</p>
         </div>
       </div>
      </a>
    </div>
  </div>
  <div>
  </div>
 </div>
</template>
<script setup>
let channelId=$ref(null)
let videos=$ref([])

onMounted=()=>{
   channelId=$route.params.channelId
   axios.get('/channel/videos',{params:{channelId:channelId}})
   .then(res=>{
      videos=res.data.videos
   })
}
</script>
