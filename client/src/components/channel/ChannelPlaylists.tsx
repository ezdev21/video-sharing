import { useChannelStore } from "@/store/channel.store";
import { useParams } from "react-router-dom";
import { VideoCardSkeleton } from "../ui/VideoCardSkeleton";
import type { Playlist } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function ChannelPlaylists() {
  const { id } = useParams<{ id: string }>()
  useChannelStore.setState({channelId: id});
  const fetchChannelPlaylists = useChannelStore((state) => state.fetchChannelPlaylists)
  
  const { error, isLoading, data:channelPlaylists } = useQuery({
    queryKey: ['channel',id,'playlists'],
    queryFn: fetchChannelPlaylists
  })
  
  if(error){
    return (
      <div className="p-5 text-xl dark:text-gray-300">error loading channel playlists</div>
    )
  }
  
  if(!channelPlaylists?.length){
    return (
      <div className="p-5 text-xl dark:text-gray-300">this channel has no playlists</div>
    )
  }
  
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading
        ? Array.from({ length: 16 }).map((_, i) => (
          <VideoCardSkeleton key={i} />
          ))
        :
        channelPlaylists.map((pl:Playlist) => (
          <div key={pl.id} className="border p-4 rounded">
            <h3 className="font-medium">{pl.title}</h3>
            <p className="text-sm text-gray-500">{pl.videoCount} videos</p>
          </div>
        ))
      }
    </div>
  )
}
