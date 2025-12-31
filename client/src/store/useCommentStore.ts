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
  userId: '',
  videoId: '',
  comments: [],
  newComment: '',
  fetchComments: async () =>{
    await api.get(`/video/${get().videoId}/comments`)
    .then((res) => {
      set({comments: res.data});
    }).catch((error) => {
      console.error('Error fetching comments:', error);
    })
  },
  addComment: async () => {
    await api.post('/comment')
    .then((res) => {
      set({comments: res.data, ...get().comments});
    }).catch((error) => {
      console.error('Error adding a new comment:', error);
    })
    set({newComment: ""});
  }
}))
