import { Link } from "react-router-dom"
import type { Video } from "@/types"

interface VideoCardProps {
  video: Video
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="cursor-pointer">
      {/* Thumbnail */}
      <div className="relative rounded-xl overflow-hidden">
        <Link to={`/video/${video.id}`}>
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full aspect-video object-cover"
          />
          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
            {video.duration}
          </span>
        </Link>
      </div>

      {/* Info */}
      <Link to={`/channel/${video.channel}`}>
      <div className="flex gap-3 mt-3">
        <img
          src={video.channelAvatar}
          alt={video.channel}
          className="w-9 h-9 rounded-full"
        />

        <div>
          <h3 className="text-sm font-semibold leading-snug line-clamp-2">
            {video.title}
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            {video.channel}
          </p>

          <p className="text-xs text-gray-500">
            {video.views} views • {video.time}
          </p>
        </div>
      </div>
      </Link>
    </div>
  )
}
