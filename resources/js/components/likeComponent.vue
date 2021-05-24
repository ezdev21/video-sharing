<template>
<div class="inline mx-4">
  <button @click="like" class="bg-green-500 text-xl p-1 px-4 text-white rounded" :class="liked ? 'bg-gray-400 text-black':''">
  {{likeText}}</button>
  <span class="text-xl mr-2">{{totalLikes}}</span>
  <button @click="dislike" class="bg-red-500 text-xl p-1 px-4 ml-2 text-white rounded" :class="liked ? 'bg-gray-400 text-black':''">
  {{dislikeText}}</button>
  <span class="text-xl text-red">{{totalDislikes}}</span>
</div>
</template>
<script>
export default {
    props:['userId','videoId'],
    data(){
        return{
          liked:false,
          disliked:false,
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
        },
        dislike(){
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
    }

}
</script>