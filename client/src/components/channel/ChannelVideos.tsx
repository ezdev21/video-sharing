import { Link, useParams } from "react-router-dom";
import { useChannelStore } from "@/store/channel.store";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { VideoCardSkeleton } from "../ui/VideoCardSkeleton";

export default function ChannelVideos() {
  const { id } = useParams<{ id: string }>()
  useChannelStore.setState({channelId: id});
  const fetchChannelVideos = useChannelStore((state) => state.fetchChannelVideos)
  
  const { error, isLoading, data:channelVideos } = useQuery({
    queryKey: ['channel',id,'videos'],
    queryFn: fetchChannelVideos
  })
  
  if(error){
    return (
      <div className="p-5 text-xl dark:text-gray-300">error loading channel videos</div>
    )
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {isLoading
      ? Array.from({ length: 16 }).map((_, i) => (
        <VideoCardSkeleton key={i} />
      ))
      : channelVideos && channelVideos.map(video => (
        <div key={video.id} className="cursor-pointer">
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
            <h3 className="text-md font-medium line-clamp-2 dark:text-gray-400">
              {video.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {video.views} views • {dayjs(video.createdAt).fromNow()}
            </p>
          </div>
        </div>
      ))
      }
    </div>
  )
}
