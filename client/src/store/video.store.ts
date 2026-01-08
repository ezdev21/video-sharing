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
  likeReactions: number,
  dislikeReactions: number,
  liked: boolean,
  disliked: boolean,
  fetchVideos: () => Promise<void>,
  searchVideos: () => Promise<void>,
  fetchChannelVideos: () => Promise<void>,
  fetchVideo: () => Promise<void>,
  fetchRecommendedVideos: () => Promise<void>,
  fetchVideoReacts: () => Promise<void>
  reactVideo: (userId:string,type:string) => Promise<void>,
  fetchUserReaction: (userId:string) => Promise<void>,
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
  likeReactions: 0,
  dislikeReactions: 0,
  liked: false,
  disliked: false,
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
  },
  fetchVideoReacts: async () => {
    await api.get('/video/react',{
      params: {
        videoId: get().currentVideoId
      }
    })
    .then((res) => {
      set({likeReactions: res.data.likeReactions});
      set({dislikeReactions: res.data.dislikeReactions});
    }).catch((error) => {
      console.error('Error fetching video reactions',error);
    })
  },
  fetchUserReaction: async (userId: string) => {
    await api.get('/video/user-reaction',{
      params: {
        videoId: get().currentVideoId,
        userId: userId
      }
    })
    .then((res) => {
      set({liked: res.data.liked});
      set({disliked: res.data.disliked});
    }).catch((error) => {
      console.error('Error fetching user video reactions');
    })
  },
  reactVideo: async (userId: string,type: string) => {
    await api.post('/video/react',{
      videoId: get().currentVideoId,
      userId: userId,
      type: type
    })
    .then((res) => {
    }).catch((error) => {
      console.error('Error fetching user follwing:', error);
    })
  }
}))
