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
    try {
      const { data } = await api.get(`/channel/${get().id}/posts`);
      set({posts: data});
    } catch (error) {
      console.error('Error fetching post videos:', error);
      throw error
    }
  },
}))
