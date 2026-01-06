import api from "@/lib/api"
import type { Channel } from "@/types"
import { create } from "zustand"

type ChannelState = {
  id: string,
  channel: Channel,
  fetchChannel: () => Promise<void>
}

export const useChannelStore = create<ChannelState>((set,get) => ({
  id: '',
  channel: {
    id: 0,
    name: '',
    avatar: '',
    followers: '',
    background: '',
    createdAt: '',
    updatedAt: ''   
  },
  fetchChannel: async () => {
    await api.get(`/channel/${get().id}`)
    .then((res) => {
      set({channel: res.data});
    }).catch((error) => {
      console.error('Error fetching channel videos:', error);
    })
  },
}))
