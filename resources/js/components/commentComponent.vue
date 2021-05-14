<template>
 <div>
  <p class="text-2xl">{{comments.length}} comments</p>
  <div v-if="userId">
   <form action="" @submit.prevent="comment">
    <input type="text" v-model="comment" class="" required>
    <input type="submit" value="comment" class="">
   </form> 
  </div>
  <div v-for="comment in comments" :key="comment.id">
    <p><span>{{comment.user.name}}</span><span>{{comment.created-at}}</span></p>
    <p>{{comment.body}}</p>
    <p>
     <span class="text-xl">{{comment.likes.length}}</span>
     <button @click="likeComment" class="text-xl text-white bg-green-600 rounded p-1">like</button>
     <span>{{comment.likes.length}}</span>
     <button @click="dislikeComment" class="text-xl text-white bg-red-600 rounded p-1">dislike</button>
    </p>
    <p v-if="userId===comment.user.id">
     <button @click="editComment">edit</button>
     <button @click="deleteComment">delete</button>
    </p>
  </div>
 </div>      
</template>
<script>
export default {
   props:['videoId','userId'],
   data(){
    return{
     comment:'',
     userId,
     comment:{},
     comments:[]
    }
   },
   mounted(){
     axios.get('video/comment',{params:{videoId:this.videoId}})
          .then(res=>{

          })
          .catch(err=>{

          });       
   },
   methods:{
     comment()
     {
      axios.post('video/comment',{videoId:this.videoId,userId:this.userId,comment:this.comment})
           .then(res=>{
              this.comment='';
           }).
           catch(err=>{
            console.log('error in commenting');
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
       axios.post('/comment/like',{params:{userId:this.userId,commentId:this.commentId},type:'dislike'})
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