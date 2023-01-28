<template>
  <div>
   <div class="">
    <button @click="subscribe" class=" text-2xl font-meduim py-2 px-4 rounded-lg"
    :class="[subscribed? 'bg-gray-300 text-gray-700' : 'bg-first text-white']"
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
<script setup>
defineProps({userId,channelId})

let subscribeText=$ref('subscribe')
let subscribed=$ref(false)
let subscribing=$ref(false)

onMounted(()=>{
    axios.get('/channel/subscribe',{params:{channelId:channelId,userId:userId}})
    .then(res=>{
        subscribed=res.data.subscribed
        if(subscribed){
            subscribeText='subscribed'
        }
    })
    .catch(err=>{

    })
})

const subscribe=()=>{
    if(userId){
    axios.post('/channel/subscribe',{userId:userId,channelId:channelId})
    .then(res=>{
        subscribed=!subscribed
        subscribeText=='subscribe' ? subscribeText='subscribed' : subscribeText='subscribe'
    })
    .catch(err=>{

    })
    }
    else{
        subscribing=true
    }
}

</script>
