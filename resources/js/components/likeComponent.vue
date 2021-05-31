<template>
<div class="inline mx-4">
  <button @click="like" class="bg-white">
   <svg xmlns="http://www.w3.org/2000/svg" class=" h-10 w-10" :class="[liked? 'fill-current text-green-500' :'']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
   </svg>
  </button>
  <span class="text-xl mr-2 my-auto">{{totalLikes}}</span>
  <button @click="dislike" class="" >
   <svg xmlns="http://www.w3.org/2000/svg" class=" h-10 w-10" fill="none" :class="[disliked? 'fill-current text-red-500':'']" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
   </svg>
  </button>
  <span class="text-xl text-red">{{totalDislikes}}</span>
  <div v-if="liking" class="absolute inset-0 z-20 flex justify-center items-center">
   <div class="fixed bg-white p-10 flex flex-col justify-center items-center rounded-xl">
     <button @click="liking=false" class="absolute top-0 right-0 text-4xl px-3 text-red-500">x</button>
     <p class="text-2xl">want to like this video ?</p>
     <p class="text-xl">sign in to like this video</p>
     <p class="m-auto"><a href="/login" class="text-2xl text-primary">sign in</a></p>
    </div> 
  </div> 
  <div v-if="liking" @click="liking=false" class="absolute -inset-full opacity-50 bg-black z-10"></div>
  <div v-if="disliking" class="absolute inset-0 z-20 flex justify-center items-center">
    <div class="fixed bg-white p-10 flex flex-col justify-center items-center rounded-xl">
     <button @click="disliking=false" class="absolute top-0 right-0 text-4xl px-3 text-red-500">x</button>
     <p class="text-2xl">want to dislike this video ?</p>
     <p class="text-xl">sign in to dislike this video</p>
     <p class="m-auto"><a href="/login" class="text-2xl text-primary">sign in</a></p>
    </div>
  </div>  
  <div v-if="disliking" @click="disliking=false" class="absolute -inset-full opacity-50 bg-black z-10"></div>
</div>
</template>
<script>
export default {
    props:['userId','videoId'],
    data(){
        return{
          liked:false,
          disliked:false,
          liking:false,
          disliking:false,
          totalLikes:0,
          totalDislikes:0,
        }
    },
    mounted(){
      axios.get('/video/like',{params:{videoId:this.videoId,userId:this.userId}})
      .then(res=>{
          this.liked=res.data.liked;
          this.disliked=res.data.disliked;
          this.totalLikes=res.data.totalLikes;
          this.totalDislikes=res.data.totalDislikes;
      })
      .catch(err=>{
        
      });
    },
    methods:{
        like(){
         if(this.userId){
            axios.post('/video/like',{videoId:this.videoId,userId:this.userId,type:'like',status:this.liked})
            .then(res=>{ 
              this.liked ? this.totalLikes-=1 : this.totalLikes+=1;
              this.disliked ? this.totalDislikes-=1 : '';
              this.liked=!this.liked;
              if(this.liked&&this.disliked){
                this.disliked=false;
              }
            })
            .catch(err=>{
              
            });
         }
         else{
           this.liking=true; 
         }   
        },
        dislike(){
          if(this.userId){
            axios.post('/video/like',{videoId:this.videoId,userId:this.userId,type:'dislike',status:this.disliked})
            .then(res=>{ 
              this.disliked ? this.totalDislikes-=1 : this.totalDislikes+=1;
              this.liked ? this.totalLikes-=1 : '';
              this.disliked=!this.disliked;
              if(this.liked&&this.disliked){
                this.liked=false;
              }
            })
            .catch(err=>{
              
            });
          }
          else{
           this.disliking=true; 
          }  
        }
    }

}
</script>