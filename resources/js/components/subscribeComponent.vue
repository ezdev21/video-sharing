<template>
<button @click="suscribe" class="[bg-yellow-700,bg-gray-300 : subscribed]">{{button}}</button>
</template>
<script>
export default {
    props:['userId','channelId'],
    data(){
        return{
          button:'subscribe',
          subscribed:false
        }
    },
    mounted(){
      axios.get('api/')
    },
    methods:{
        subscribe(){
            axios.post('/api/suscribe',{this.userId,this.channelId})
            .then(res=>{
             if(subscribed){
              this.buttonText='un'.this.buttonText;
             }   
             this.subscribed=!this.subscribed;
            })
        }
    }

}
</script>