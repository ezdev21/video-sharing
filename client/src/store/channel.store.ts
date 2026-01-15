import api from "@/lib/api"
import type { Channel, Playlist, Post, Video } from "@/types"
import { create } from "zustand"

type ChannelState = {
  channelId: string,
  userId: string | null,
  channel: Channel | null,
  channelVideos: Video[],
  channelPosts: Post[],
  channelPlaylists: Playlist[],
  following: boolean,
  fetchChannel: () => Promise<Channel>,
  channelFollowing: () => Promise<void>,
  channelFollow: () => Promise<void>,
  fetchChannelVideos: () => Promise<Video[]>,
  fetchChannelPosts: () => Promise<Post[]>,
  fetchChannelPlaylists: () => Promise<Playlist[]>,
}

export const useChannelStore = create<ChannelState>((set,get) => ({
  channelId: '',
  userId: '',
  following: false,
  channelVideos: [],
  channelPosts: [],
  channelPlaylists: [],
  channel: null,
  fetchChannel: async () => {
    try {
      const { data } = await api.get(`/channel/${get().channelId}`)
      set({channel: data});
      return data;
    } catch (error) {
      console.error('Error fetching channel videos:', error);
      throw error
    }
  },
  
  channelFollowing: async () => {
    try {
      const { data } = await api.get('/channel/follow',{
      params: {
        channelId: get().channelId,
        userId: get().userId
      }
    })
    set({following: data.following});
    return data.following
    } catch (error) {
      console.error('Error fetching user follwing:', error);
      throw error
    }
  },
  channelFollow: async () => {
    try {
      const { data } = await api.post('/channel/follow',{channelId: get().channelId,userId: get().userId})
      set({following: data.following});
      return data.following;
    } catch (error) {
      console.error('Error fetching user follwing:', error);
      throw error
    }
  },
  fetchChannelVideos: async () => {
    try {
      const { data } = await api.get(`/channel/${get().channelId}/videos`)
      set({channelVideos: data});
      return data;
    } catch (error) {
      console.error('Error fetching channel videos', error);
      throw error
    }
  },
  fetchChannelPosts: async () => {
    try {
      const { data } = await api.get(`/channel/${get().channelId}/posts`)
      set({channelPosts: data});
      return data;
    } catch (error) {
      console.error('Error fetching channel posts', error);
      throw error
    }
  },

  fetchChannelPlaylists: async () => {
    try {
      const { data } = await api.get(`/channel/${get().channelId}/playlists`)
      set({channelPlaylists: data});
      return data;
    } catch (error) {
      console.error('Error fetching channel playlists', error);
      throw error
    }
  },
}))
