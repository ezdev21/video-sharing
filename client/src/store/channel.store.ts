import api from "@/lib/api"
import type { Channel, Playlist, Post, Video } from "@/types"
import { create } from "zustand"

type ChannelState = {
  channelId: string,
  userId: string | null,
  channel: Channel,
  channelVideos: Video[],
  channelPosts: Post[],
  channelPlaylists: Playlist[],
  following: boolean,
  fetchChannel: () => Promise<void>,
  channelFollowing: () => Promise<void>,
  channelFollow: () => Promise<void>,
  fetchChannelVideos: () => Promise<void>,
  fetchChannelPosts: () => Promise<void>,
  fetchChannelPlaylists: () => Promise<void>,
}

export const useChannelStore = create<ChannelState>((set,get) => ({
  channelId: '',
  userId: '',
  following: false,
  channelVideos: [],
  channelPosts: [],
  channelPlaylists: [],
  channel: {
    id: '',
    name: '',
    avatar: '',
    followers: '',
    background: '',
    createdAt: '',
    updatedAt: ''
  },
  fetchChannel: async () => {
    await api.get(`/channel/${get().channelId}`)
    .then((res) => {
      set({channel: res.data});
    }).catch((error) => {
      console.error('Error fetching channel videos:', error);
    })
  },
  channelFollowing: async () => {
    await api.get('/channel/follow',{
      params: {
        channelId: get().channelId,
        userId: get().userId
      }
    })
    .then((res) => {
      set({following: res.data.following});
    }).catch((error) => {
      console.error('Error fetching user follwing:', error);
    })
  },
  channelFollow: async () => {
    await api.post('/channel/follow',{channelId: get().channelId,userId: get().userId})
    .then((res) => {
      set({following: res.data.following});
    }).catch((error) => {
      console.error('Error fetching user follwing:', error);
    })
  },
  fetchChannelVideos: async () => {
    await api.get(`/channel/${get().channelId}/videos`)
    .then((res) => {
      set({channelVideos: res.data});
    }).catch((error) => {
      console.error('Error fetching channel videos', error);
    })
  },
  fetchChannelPosts: async () => {
    await api.get(`/channel/${get().channelId}/posts`)
    .then((res) => {
      set({channelPosts: res.data});
    }).catch((error) => {
      console.error('Error fetching channel posts', error);
    })
  },
  fetchChannelPlaylists: async () => {
    await api.get(`/channel/${get().channelId}/playlists`)
    .then((res) => {
      set({channelPlaylists: res.data});
    }).catch((error) => {
      console.error('Error fetching channel playlists', error);
    })
  },
}))
