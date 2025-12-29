import { Link } from "react-router-dom"
import type { Video } from "@/types"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface VideoCardProps {
  video: Video
}

export default function VideoCard({ video }: VideoCardProps) {

  return (
    <div className="cursor-pointer">
      {/* Thumbnail */}
      <div className="relative rounded-md overflow-hidden">
        <Link to={`/video/${video.id}`}>
          <img
            src={`http://localhost:3000/uploads/videos/thumbnail/${video.thumbnail}`}
            alt={video.title}
            className="w-full aspect-video object-cover"
          />
          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
            {video.duration}
          </span>
        </Link>
      </div>

      {/* Info */}
      <Link to={`/channel/${video.channel?.id}`}>
      <div className="flex gap-3 mt-2 items-center">
        <img
          src={`http://localhost:3000/uploads/channels/avatar/${video.channel.avatar}`}
          alt={video.channel.avatar}
          className="w-10 h-10 rounded-full"
        />

        <div>
          <h3 className="text-md font-medium line-clamp-2">
            {video.title}
          </h3>

          <p className="text-sm font-normal text-gray-600">
            {video.channel.name}
          </p>

          <p className="text-xs text-gray-500">
            {video.views} views • {dayjs(video.createdAt).fromNow()}
          </p>
        </div>
      </div>
      </Link>
    </div>
  )
}
