import type { Playlist } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ChannelPlaylists() {
  const { id } = useParams<{ id: string }>()
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  
  const fetchPlaylists = async () => {
    await fetch(`http://localhost:3000/channel/${id}/playlists`)
    .then(res => res.json())
    .then((data: Playlist[]) => {
      setPlaylists(data);
    }).catch((error) => {
      console.error('Error fetching channel playlists:', error);
    })
  }
  
  useEffect(() => {
    fetchPlaylists();
  }, [])

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
