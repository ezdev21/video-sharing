import api from "@/lib/api"
import type { Video } from "@/types"
import { create } from "zustand"

type VideoState = {
  loading: boolean,
  videos: Video[],
  query: string,
  searchedVideos: Video[],
  channelId: string,
  channelVideos: Video[],
  fetchVideos: () => Promise<void>,
  searchVideos: () => Promise<void>,
  fetchChannelVideos: () => Promise<void>,
}

export const useVideoStore = create<VideoState>((set,get) => ({
  loading: true,
  videos: [],
  query: '',
  searchedVideos: [],
  channelId: '',
  channelVideos: [],
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
  }
}))
