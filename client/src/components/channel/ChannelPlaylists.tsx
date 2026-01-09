import { useChannelStore } from "@/store/channel.store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ChannelPlaylists() {
  const { id } = useParams<{ id: string }>()
  const channelPlaylists = useChannelStore((state) => state.channelPlaylists)
  const fetchChannelPlaylists = useChannelStore((state) => state.fetchChannelPlaylists)
  
  useEffect(() => {
    useChannelStore.setState({channelId: id});
    fetchChannelPlaylists();
  }, [id,fetchChannelPlaylists]);
  
  if(!channelPlaylists.length){
    return (
      <h1 className="p-5 text-xl dark:text-gray-300">Channel has no playlists</h1>
    )
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {channelPlaylists.map(pl => (
        <div key={pl.id} className="border p-4 rounded">
          <h3 className="font-medium">{pl.title}</h3>
          <p className="text-sm text-gray-500">{pl.videoCount} videos</p>
        </div>
      ))}
    </div>
  )
}
