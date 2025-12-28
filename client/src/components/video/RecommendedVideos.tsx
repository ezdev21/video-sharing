import type { Video } from "@/types"
import { Link } from "react-router-dom"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface RecommendedVideosProps {
  videos: Video[]
}

export default function RecommendedVideos({
  videos,
}: RecommendedVideosProps) {
  return (
    <div className="space-y-4">
      {videos.map((video) => (
        
        <div
          key={video.id}
          className="flex gap-3 cursor-pointer"
        >
          <Link to={`/video/${video.id}`}>
            <img
              src={`http://localhost:3000/uploads/videos/thumbnail/${video.thumbnail}`}
              className="w-40 h-24 object-cover rounded-lg"
              alt={video.title}
            />
          </Link>

          <div>
            <h3 className="text-md font-medium line-clamp-2">
              {video.title}
            </h3>

            <Link to={`/channel/${video.channel.id}`}>
              <p className="text-sm text-gray-700 mt-1">
                {video.channel.name}
              </p>
            </Link>   

            <p className="text-xs text-gray-500">
              {video.views} views • {dayjs(video.createdAt).fromNow()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
