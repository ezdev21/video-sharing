import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useChannelStore } from "@/store/channel.store";
import dayjs from "dayjs";

export default function ChannelVideos() {
  const { id } = useParams<{ id: string }>()
  const channelVideos = useChannelStore((state) => state.channelVideos)
  const fetchChannelVideos = useChannelStore((state) => state.fetchChannelVideos)
  
  useEffect(() => {
    useChannelStore.setState({channelId: id});
    fetchChannelVideos();
  }, [id,fetchChannelVideos]);
  if(!channelVideos){
    return (
      <h1 className="p-5 text-xl">Channel has no videos</h1>
    )
  }
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {channelVideos.map(video => (
        <div className="cursor-pointer">
          <div className="relative rounded-md overflow-hidden">
            <Link to={`/video/${video.id}`}>
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/videos/thumbnail/${video.thumbnail}`}
                alt={video.title}
                className="w-full aspect-video object-cover"
              />
              <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                {video.duration}
              </span>
            </Link>
          </div>
          <div>
            <h3 className="text-md font-medium line-clamp-2">
              {video.title}
            </h3>
            <p className="text-xs text-gray-500">
              {video.views} views • {dayjs(video.createdAt).fromNow()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
