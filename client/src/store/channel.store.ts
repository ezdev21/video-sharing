import api from "@/lib/api"
import type { Channel, Playlist, Post, Video } from "@/types"
import { create } from "zustand"

type ChannelState = {
  channelId: string,
  userId: string | null,
  channel: Channel | null,
  userChannel: Channel | null,
  channelVideos: Video[],
  channelPosts: Post[],
  channelPlaylists: Playlist[],
  following: boolean,
  fetchChannel: () => Promise<Channel>,
  createChannel: (formData:FormData) => Promise<Channel>,
  channelFollowing: () => Promise<void>,
  channelFollow: () => Promise<void>,
  fetchChannelVideos: () => Promise<Video[]>,
  fetchChannelPosts: () => Promise<Post[]>,
  fetchChannelPlaylists: () => Promise<Playlist[]>,
  getUserChannel: (userId: string) => Promise<Channel>
}

const getStoredChannel = (): Channel | null => {
  const stored = localStorage.getItem("userChannel");
  if (!stored || stored === "undefined") return null;
  try {
    return JSON.parse(stored);
  } catch {
    console.log('parsing error');
    return null;
  }
};

export const useChannelStore = create<ChannelState>((set,get) => ({
  channelId: '',
  userId: '',
  following: false,
  channelVideos: [],
  channelPosts: [],
  channelPlaylists: [],
  channel: null,
  userChannel: getStoredChannel(),
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
  createChannel: async(formData) => {
    try {
      const { data } = await api.post("/channel", formData, {headers: {"Content-Type": "multipart/form-data"}})
      set({channel: data})
      return data;
    } catch (error) {
      console.error('Error creating channel ', error);
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
  
  getUserChannel: async (userId: string) => {
    try {
      const { data } = await api.get(`/channel/user/${userId}`)
      set({userChannel: data});
      localStorage.setItem("userChannel", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('Error fetching user channel', error);
      throw error
    }
  }

}))
