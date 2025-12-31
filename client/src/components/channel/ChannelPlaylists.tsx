import { usePlaylistStore } from "@/store/playlist.store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ChannelPlaylists() {
  const { id } = useParams<{ id: string }>()
  usePlaylistStore.setState({id: id})
  const playlists = usePlaylistStore((state) => state.playlists);
  const fetchPlaylists = usePlaylistStore((state) => state.fetchPlaylists)
  
  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists])

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {playlists.map(pl => (
        <div key={pl.id} className="border p-4 rounded">
          <h3 className="font-medium">{pl.title}</h3>
          <p className="text-sm text-gray-500">{pl.videoCount} videos</p>
        </div>
      ))}
    </div>
  )
}
