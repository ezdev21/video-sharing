import type { Video } from "@/types"
import { Link } from "react-router"

interface VideoPlayerProps {
  video: Video
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  return (
    <div>
      {/* Video */}
      <div className="w-full aspect-video bg-black rounded-md overflow-hidden">
        <video src={video?.src} className="w-full h-full" controls/>
      </div>

      {/* Video Info */}
      <h1 className="mt-4 text-lg font-semibold">
        {video?.title}
      </h1>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-3">
          <Link to={`/channel/${video?.channel.id}`} className="flex items-center gap-3">
            <img
              src={video?.channel.avatar}
              className="w-10 h-10 rounded-full"
              alt={video?.channel.name}
            />
            <div>
              <p className="font-medium">{video?.channel.name}</p>
              <p className="text-sm text-gray-500">
                {video?.views} views
              </p>
            </div>
          </Link>
        </div>

        <button className="px-4 py-2 rounded-full bg-black text-white">
          Subscribe
        </button>
      </div>
    </div>
  )
}
