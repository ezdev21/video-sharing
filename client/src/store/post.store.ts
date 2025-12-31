import api from "@/lib/api"
import type { Post } from "@/types"
import { create } from "zustand"

type PostState = {
  id: string,
  posts: Post[],
  fetchPosts: () => Promise<void>
}

export const usePostStore = create<PostState>((set,get) => ({
  id: '',
  posts: [],
  fetchPosts: async () => {
    await api.get(`/channel/${get().id}/posts`)
    .then((res) => {
      set({posts: res.data});
    }).catch((error) => {
      console.error('Error fetching post videos:', error);
    })
  },
}))
