<template>
<div class="inline mx-4">
  <button @click="like" class="bg-white">
   <svg xmlns="http://www.w3.org/2000/svg" class=" h-10 w-10" :class="[liked? 'fill-current text-first' :'']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
   </svg>
  </button>
  <span class="text-xl mr-2 my-auto">{{totalLikes}}</span>
  <button @click="dislike" class="" >
   <svg xmlns="http://www.w3.org/2000/svg" class=" h-10 w-10" fill="none" :class="[disliked? 'fill-current text-first':'']" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
   </svg>
  </button>
  <span class="text-xl text-red">{{totalDislikes}}</span>
  <div v-if="liking" class="fixed z-20 bottom-1/3 left-1/3 bg-white p-10 flex flex-col justify-center items-center rounded-xl">
     <button @click="liking=false" class="absolute top-0 right-0 text-4xl px-3 text-gray:600 hover:text-red-500">x</button>
     <p class="text-2xl">want to like this video ?</p>
     <p class="text-xl">sign in to like this video</p>
     <p class="m-auto"><a href="/login" class="text-2xl text-primary">sign in</a></p>
    </div>
    <div v-if="liking" @click="liking=false" class="absolute -inset-full opacity-50 bg-black z-10"></div>
    <div v-if="disliking" class="fixed z-20 bottom-1/3 left-1/3 inset-auto bg-white p-10 flex flex-col justify-center items-center rounded-xl">
     <button @click="disliking=false" class="absolute top-0 right-0 text-4xl px-3 text-gray:600 hover:text-red-500">x</button>
     <p class="text-2xl">want to dislike this video ?</p>
     <p class="text-xl">sign in to dislike this video</p>
     <p class="m-auto"><a href="/login" class="text-2xl text-primary">sign in</a></p>
    </div>
  <div v-if="disliking" @click="disliking=false" class="absolute -inset-full opacity-50 bg-black z-10"></div>
</div>
</template>
<script setup>
defineProps({userId,videoId})

let liked=$ref(false)
let disliked=$ref(false)
let liking=$ref(false)
let disliking=$ref(false)
let totalLikes=$ref(0)
let totalDislikes=$ref(0)

onMounted(()=>{
    axios.get('/video/like',{params:{videoId:videoId,userId:userId}})
    .then(res=>{
        liked=res.data.liked
        disliked=res.data.disliked
        totalLikes=res.data.totalLikes
        totalDislikes=res.data.totalDislikes
    })
    .catch(err=>{

    })
})

const like=()=>{
    if(userId){
    axios.post('/video/like',{videoId:videoId,userId:userId,type:'like',status:liked})
    .then(res=>{
        liked ? totalLikes-=1 : totalLikes+=1
        disliked ? totalDislikes-=1 : ''
        liked=!liked
        if(liked&&disliked){
        disliked=false
        }
    })
    .catch(err=>{

    })
    }
    else{
    liking=true
    }
}

const dislike=()=>{
    if(userId){
    axios.post('/video/like',{videoId:videoId,userId:userId,type:'dislike',status:disliked})
    .then(res=>{
        disliked ? totalDislikes-=1 : totalDislikes+=1
        liked ? totalLikes-=1 : ''
        disliked=!disliked
        if(liked&&disliked){
        liked=false
        }
    })
    .catch(err=>{

    })
    }
    else{
    disliking=true
    }
}

</script>
