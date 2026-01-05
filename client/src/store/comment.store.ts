import api from "@/lib/api"
import { create } from "zustand"

type CommentState = {
  userId: string,
  videoId: string,
  comments: Comment[],
  newComment: string,
  fetchComments: () => Promise<void>,
  addComment: () => Promise<void>,
}

export const useCommentStore = create<CommentState>((set,get) => ({
  userId: '1',
  videoId: '1',
  comments: [],
  newComment: '',
  fetchComments: async () =>{
    await api.get(`/comment`,{params: {videoId: get().videoId}})
    .then((res) => {
      set({comments: res.data});
    }).catch((error) => {
      console.error('Error fetching comments:', error);
    })
  },
  addComment: async () => {
    await api.post('/comment',{userId: get().userId, videoId: get().videoId, body: get().newComment})
    .then((res) => {
      set({comments: [res.data, ...get().comments]});
    }).catch((error) => {
      console.error('Error adding a new comment:', error);
    })
    set({newComment: ""});
  }
}))
