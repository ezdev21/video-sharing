<template>
 <div>
  <p class="text-2xl mx-3">{{comments.length}} comments</p>
  <div v-if="userId">
    <p class="text-xl mx-3">comment as {{user.name}}</p>
   <form action="" @submit.prevent="addComment">
    <textarea name="description" rows="5" required
        class="text-lg w-2/3 block h-40 my-2 p-2 rounded-lg border-2 border-gray-200" v-model="body"></textarea>
    <input type="submit" value="comment" class="rounded bg-blue-500 text-white text-xl py-1 px-2">
   </form> 
  </div>
  <div v-else>
   <p class="text-xl">sign in to comment <a href="/login" class="no-underline text-xl text-blue-500 m-1">sign in</a></p>
  </div>
  <div v-for="comment in comments" :key="comment.id" class="shadow-sm rounded bg-blue-100 m-4 p-3">
    <p class="">
      <span class="text-lg font-semibold">{{comment.user.name}}</span>
      <span class="mx-4">{{comment.created_at}}</span>  
    </p>
    <p class="text-lg">{{comment.body}}</p>
    <div class="flex">
      <p class="mx-2">
        <button @click="likeComment" class=" rounded px-1 mx-1">
          <svg xmlns="http://www.w3.org/2000/svg" class=" h-5 w-5" :class="[comment.status=='liked'? 'fill-current text-green-500' :'']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
        </button>
        <span class="text-lg">{{comment.totalLikes}}</span>
        <button @click="dislikeComment" class="rounded px-2 mx-1">
          <svg xmlns="http://www.w3.org/2000/svg" class=" h-5 w-5" fill="none" :class="[comment.status=='disliked'? 'fill-current text-red-500':'']" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
          </svg>
        </button>
        <span class="text-lg">{{comment.totalDislikes}}</span>
      </p>
      <p v-if="userId==comment.user.id" class="mx-2">
        <button @click="editing=true;editedId=comment.id;editedBody=comment.body" class="rounded text-blue-500 text-lg px-2 mx-1">edit</button>
        <button @click="deleting=true;deletedId=comment.id;" class="rounded text-red-500 text-lg px-2 mx-1">delete</button>
      </p>
    </div>
  </div>
     <div v-if="editing" class="fixed top-1/3 left-1/4 z-20 w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2 px-10 py-2 bg-gray-300 rounded-xl">
      <button @click="editing=false" class="absolute top-0 right-0 text-4xl px-3 text-red-500">x</button>
      <p class="text-2xl text-center mt-10 mb-2 text-gray-900">Edit your comment</p>
      <form v-if="editing" @submit.prevent="editComment(editedId)">
         <textarea name="description" v-model="editedBody" 
         class="text-xl m-auto p-2 w-full h-40 rounded-xl border-2"></textarea>
         <input type="submit" value="edit comment" class="rounded bg-green-500 m-auto text-white text-2xl py-1 px-2"> 
      </form> 
     </div>  
  <div v-if="editing" @click="editing=false" class="absolute -inset-y-full -inset-x-0 opacity-50 bg-black z-10"></div>
     <div v-if="deleting" class="fixed z-20 bottom-1/3 left-1/3 px-2 py-2 bg-white rounded-xl">
      <button @click="deleting=false" class="absolute top-0 right-0 text-4xl px-3 text:gray-600 hover:text-red-500">x</button>
      <p class="text-2xl text-center mt-10 mb-2 text-gray-900">are you sure to delete remember this is unchangable</p>
      <form @submit.prevent="deleteComment(deletedId)">
         <input type="submit" value="delete anyways" class="block rounded bg-red-500 mx-auto my-3 text-white text-2xl py-1 px-2"> 
      </form> 
     </div>  
  <div v-if="deleting" @click="deleting=false" class="absolute -inset-full opacity-50 bg-black z-10"></div>
 </div>      
</template>
<script>
export default {
   props:['videoId','userId'],
   data(){
    return{
     body:'',
     editing:false,
     editedId:null,
     deleting:false,
     deletedId:null,
     editedBody:'',
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
          })          
   },
   methods:{
     addComment()
     {
      axios.post('/comment/store',{videoId:this.videoId,userId:this.userId,body:this.body})
           .then(res=>{
             let comment=res.data.comment;
             this.comments.push(comment);
             this.body='';

           }).
           catch(err=>{
           });
     },
     editComment(id){
       axios.patch('/comment/update',{body:this.editedBody,commentId:id})
        .then(res=>{
          var comment=this.comments.find(comment=>{
            return comment.id==id });
          comment.body=this.editedBody;
          this.editing=false;
        })
        .catch(res=>{

        });  
     },
     deleteComment(id){
      axios.delete('/comment/delete',{params:{commentId:id}})
        .then(res=>{
          var comment=this.comments.find(comment=>{
            return comment.id==id;
          });
          this.comments.pop(comment);
          this.deleting=false;
        })
        .catch(res=>{

        });  
        },
      likeComment(commentId){
      axios.post('/comment/like',{params:{userId:this.userId,commentId:this.commentId,type:'like'}})
           .then(res=>{
            let comment=comments.find(commentId);
            comment.status='liked' 
           })
           .catch(res=>{

           });   
     },
     dislikeComment(commentId){
       axios.post('/comment/dislike',{params:{userId:this.userId,commentId:this.commentId},type:'dislike'})
            .then(res=>{
              let comment=comments.find(commentId);
              comment.status='disliked'
            })
            .catch(res=>{

           });  
     },       
    }    
}
</script>