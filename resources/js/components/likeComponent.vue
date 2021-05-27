<template>
<div class="inline mx-4">
  <button @click="like" class="bg-green-500 text-xl p-1 px-4 text-white rounded" :class="{'bg-gray-400 text-black' : liked}">
  {{likeText}}</button>
  <span class="text-xl mr-2">{{totalLikes}}</span>
  <button @click="dislike" class="bg-red-500 text-xl p-1 px-4 ml-2 text-white rounded" :class="{'bg-gray-400 text-black':liked}">
  {{dislikeText}}</button>
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
          likeText:'like',
          dislikeText:'dislike',
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
          this.liked ? this.likeText='liked' : this.likeText='like'
          this.disliked ? this.dislikeText='disliked' : this.dislikeText='dislike'
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
              this.disliked ? this.dislikeText='disliked' : this.dislikeText='dislike';
              this.liked ? this.likeText='liked' : this.likeText='like';
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
              this.liked ? this.likeText='liked' : this.likeText='like';
              this.disliked ? this.dislikeText='disliked' : this.dislikeText='dislike';
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