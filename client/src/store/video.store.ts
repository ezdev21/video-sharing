import api from "@/lib/api"
import type { Video } from "@/types"
import { create } from "zustand"

type VideoState = {
  loading: boolean,
  videos: Video[] | null,
  query: string,
  searchedVideos: Video[] | null,
  channelId: string,
  channelVideos: Video[] | null,
  currentVideo: Video | null,
  currentVideoId: string | null,
  recommendedVideos: Video[] | null,
  fetchVideos: () => Promise<void>,
  searchVideos: () => Promise<void>,
  fetchChannelVideos: () => Promise<void>,
  fetchVideo: () => Promise<void>,
  fetchRecommendedVideos: () => Promise<void>,
}

export const useVideoStore = create<VideoState>((set,get) => ({
  loading: true,
  videos: [],
  query: '',
  searchedVideos: [],
  channelId: '',
  channelVideos: [],
  currentVideo: null,
  currentVideoId: '',
  recommendedVideos: [],
  fetchVideos: async () => {
    await api.get('/video')
    .then((res) => {
      set({videos: res.data})
      set({loading: false})
    }).catch((error) => {
      console.error('Error fetching videos:', error);
    })
  },
  searchVideos: async () => {
    await api.get(`/video/search?query=${get().query}`)
    .then((res) => {
      set({searchedVideos: res.data})
    }).catch((err: unknown) => {
      console.error('Error fetching videos:', err);
    })
  },
  fetchChannelVideos: async () => {
    await api.get(`/channel/${get().channelId}/videos`)
    .then((res) => {
      set({channelVideos: res.data});
    }).catch((error) => {
      console.error('Error fetching channel videos:', error);
    })
  },
  fetchVideo: async () => {
    await api.get(`/video/${get().currentVideoId}`)
    .then((res) => {
      set({currentVideo: res.data});
    }).catch((error) => {
      console.error('Error fetching videos:', error);
    })
  },
  fetchRecommendedVideos: async () => {
    await api.get(`/video/${get().currentVideoId}/recommended`)
    .then((res) => {
      set({recommendedVideos :res.data});
    }).catch((error) => {
      console.error('Error fetching videos:', error);
    })
  }
}))
