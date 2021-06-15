<template>
 <div>
  <button @click="showNotifications">
   <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
  </svg>     
  </button>
  <div>
  <ul>
   <li v-for="notification in notifications" :key="notification.id">
    <a href="#">{{notification.data}}</a>    
   </li>    
  </ul>    
  </div>     
 </div>  
</template>
<script>
export default {
  props:['userId'],  
  data(){
   notifications:[]
  },
  mounted(){
   axios.get('/user/notifications',{params:{userId:this.userId}})
  },
  methods:{

  }  
}
</script>