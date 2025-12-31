import VideoCard from "../video/VideoCard";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVideoStore } from "@/store/useVideoStore";

export default function ChannelVideos() {
  const { id } = useParams<{ id: string }>()
  useVideoStore.setState({channelId: id});
  const channelVideos = useVideoStore((state) => state.channelVideos)
  const fetchChannelVideos = useVideoStore((state) => state.fetchChannelVideos)
  
  useEffect(() => {
    fetchChannelVideos()
  }, [fetchChannelVideos]);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {channelVideos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}
