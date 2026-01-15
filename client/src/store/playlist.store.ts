import api from "@/lib/api"
import type { Playlist } from "@/types"
import { create } from "zustand"

type PlaylistState = {
  id: string,
  playlists: Playlist[],
  fetchPlaylists: () => Promise<void>
}

export const usePlaylistStore = create<PlaylistState>((set,get) => ({
  id: '',
  playlists: [],
  fetchPlaylists: async () => {
    try {
      const { data } = await api.get(`/channel/${get().id}/playlists`);
      set({playlists: data});
    } catch (error) {
      console.error('Error fetching playlist videos:', error);
      throw error;
    }
  },
}))
