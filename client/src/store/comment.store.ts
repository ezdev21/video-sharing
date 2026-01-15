import api from "@/lib/api"
import { create } from "zustand"
import { useAuthStore } from "./auth.store"

type CommentState = {
  userId: string | null,
  videoId: string,
  comments: Comment[] | [],
  newComment: string,
  fetchComments: () => Promise<void>,
  addComment: () => Promise<void>,
}

export const useCommentStore = create<CommentState>((set,get) => ({
  userId: useAuthStore.getState().user?.id || '',
  videoId: '',
  comments: [],
  newComment: '',
  fetchComments: async () =>{
    try {
      const { data } = await api.get(`/comment?videoId=${get().videoId}`);
      set({comments: data});
      return data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },
  addComment: async () => {
    if(get().newComment){
      try {
        const { data } = await api.post('/comment',{userId: get().userId, videoId: get().videoId, body: get().newComment});
        set({comments: [data, ...get().comments]});
        set({newComment: ""});
      } catch (error) {
        console.error('Error adding a new comment:', error);
        throw error;
      }
    }
  }
}))
