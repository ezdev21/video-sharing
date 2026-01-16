import { create } from "zustand"
import api from "@/lib/api"
import type { Video } from "@/types"

type ReactionType = "LIKE" | "DISLIKE"

type VideoState = {
  videos: Video[]
  recommendedVideos: Video[]
  currentVideo: Video | null
  query: string
  channelId: string
  currentVideoId: string | null
  likeReactions: number
  dislikeReactions: number
  liked: boolean
  disliked: boolean
  setQuery: (query: string) => void
  setChannelId: (id: string) => void
  setCurrentVideoId: (id: string | null) => void
  fetchVideos: () => Promise<Video[]>
  searchVideos: () => Promise<Video[] | []>
  fetchVideo: () => Promise<Video | undefined>
  fetchRecommendedVideos: (id: string) => Promise<Video[]>
  fetchVideoReactions: () => Promise<void>
  fetchUserReaction: (userId: string) => Promise<void>
  reactToVideo: (userId: string, type: ReactionType) => Promise<void>,
  uploadVideo: (formData: FormData) => Promise<Video>
}

export const useVideoStore = create<VideoState>((set, get) => ({
  videos: [],
  recommendedVideos: [],
  currentVideo: null,
  query: "",
  channelId: "",
  currentVideoId: null,
  likeReactions: 0,
  dislikeReactions: 0,
  liked: false,
  disliked: false,
  setQuery: (query) => set({ query }),
  setChannelId: (id) => set({ channelId: id }),
  setCurrentVideoId: (id) => set({ currentVideoId: id }),
  fetchVideos: async () => {
    try {
      const { data } = await api.get<Video[]>("/video")
      set({ videos: data })
      return data
    } catch (error) {
      console.error("fetchVideos failed:", error)
      throw error
    }
  },

  searchVideos: async () => {
    const { query } = get()
    if (!query.trim()) {
      return [];
    }

    try {
      const { data } = await api.get<Video[]>(
        `/video/search`,
        { params: { query } }
      )
      return data;
    } catch (error) {
      console.error("searchVideos failed:", error)
      throw error
    }
  },

  fetchVideo: async () => {
    const { currentVideoId } = get()
    if (!currentVideoId) return 
    try {
      const { data } = await api.get<Video>(`/video/${currentVideoId}`)
      set({ currentVideo: data })
      return data;
    } catch (error) {
      console.error("fetchVideo failed:", error)
      throw error
    }
  },

  fetchRecommendedVideos: async (id) => {
    try {
      const { data } = await api.get<Video[]>(
        `/video/${id}/recommended`
      )
      return data;
    } catch (error) {
      console.error("fetchRecommendedVideos failed:", error)
      throw error
    }
  },

  fetchVideoReactions: async () => {
    const { currentVideoId } = get()
    if (!currentVideoId) return

    try {
      const { data } = await api.get("/video/react", {
        params: { videoId: currentVideoId },
      })

      set({
        likeReactions: data.likeReactions,
        dislikeReactions: data.dislikeReactions,
      })
    } catch (error) {
      console.error("fetchVideoReactions failed:", error)
      throw error
    }
  },

  fetchUserReaction: async (userId) => {
    const { currentVideoId } = get()
    if (!currentVideoId) return

    try {
      const { data } = await api.get("/video/user-reaction", {
        params: {
          videoId: currentVideoId,
          userId,
        },
      })

      set({
        liked: data.liked,
        disliked: data.disliked,
      })
    } catch (error) {
      console.error("fetchUserReaction failed:", error)
      throw error
    }
  },

  reactToVideo: async (userId, type) => {
    const { currentVideoId } = get()
    if (!currentVideoId) return

    try {
      await api.post("/video/react", {
        videoId: currentVideoId,
        userId,
        type,
      })
    } catch (error) {
      console.error("reactToVideo failed:", error)
      throw error
    }
  },
  uploadVideo: async(formData) => {
    try {
      const { data } = await api.post('/video', formData, {headers: {"Content-Type": "multipart/form-data",}});
      set({ videos: [...get().videos, data] });
      return data;
    } catch (error) {
      console.error("upload video failed", error)
      throw error
    }
  }
}))
