<template>
 <div>
  <p class="text-2xl">{{comments.length}} comments</p>
  <div v-if="userId">
    <p class="text-xl">comment as {{user.name}}</p>
   <form action="" @submit.prevent="addComment">
    <textarea name="description" id="" cols="60" rows="5"
        class=" p-2 rounded-lg border-2 border-gray-500" v-model="body"></textarea>
    <input type="submit" value="comment" class="rounded bg-green-500 text-white text-xl py-1 px-2">
   </form> 
  </div>
  <div v-for="comment in comments" :key="comment.id" class="rounded bg-gray-200 m-1 p-1">
    <p class=""><span class="text-lg font-semibold">{{comment.user.name}}</span><span>{{comment.created_at}}</span></p>
    <p>{{comment.body}}</p>
    <div class="flex">
      <p class="mx-2">
        <!--<span class="text-xl">{{comment.likes.length}}</span>-->
        <button @click="likeComment" class="text-lg text-white bg-green-600 rounded px-2 mx-1">like</button>
        <!--<span>{{comment.likes.length}}</span>-->
        <button @click="dislikeComment" class="text-lg text-white bg-red-600 rounded px-2 mx-1">dislike</button>
      </p>
      <p v-if="userId==comment.user.id" class="mx-2">
        <button @click="editComment" class="rounded bg-blue-500 text-white text-xl px-2 mx-1">edit</button>
        <button @click="deleteComment" class="rounded bg-red-500 text-white text-xl px-2 mx-1">delete</button>
      </p>
    </div>
  </div>
 </div>      
</template>
<script>
export default {
   props:['videoId','userId'],
   data(){
    return{
     body:'',
     user:{},
     comment:{},
     comments:[],
    }
   },
   mounted(){
     axios.get('/video/comments',{params:{videoId:this.videoId,userId:this.userId}})
          .then(res=>{
            this.comments=res.data.comments;
            this.user=res.data.user;
            console.log(this.user);
          })
          .catch(err=>{

          });       
   },
   methods:{
     addComment()
     {
      axios.post('/comment/store',{videoId:this.videoId,userId:this.userId,body:this.body})
           .then(res=>{
              //this.comments.push({});
              this.body='';
           }).
           catch(err=>{
           });
     },
     likeComment(){
      axios.post('/comment/like',{params:{userId:this.userId,commentId:this.commentId,type:'like'}})
           .then(res=>{

           })
           .catch(res=>{

           });   
     },
     dislikeComment(){
       axios.post('/comment/dislike',{params:{userId:this.userId,commentId:this.commentId},type:'dislike'})
            .then(res=>{

            })
            .catch(res=>{

           });  
     },
     editComment(){
       axios.post('/comment/edit',{params:{userId:this.userId,commentId:this.commentId}})
            .then(res=>{

            })
            .catch(res=>{

           });  
     },
     deleteComment(){
            axios.post('/comment/delete',{params:{userId:this.userId,commentId:this.commentId}})
            .then(res=>{

            })
            .catch(res=>{

           });  
     }     
   }    
}
</script>