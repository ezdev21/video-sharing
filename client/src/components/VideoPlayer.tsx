import type { Video } from "@/types/video"

interface VideoPlayerProps {
  video: Video
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  return (
    <div>
      {/* Video */}
      <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/8pDqJVdNa44"
          title={video.title}
          allowFullScreen
        />
      </div>

      {/* Video Info */}
      <h1 className="mt-4 text-lg font-semibold">
        {video.title}
      </h1>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-3">
          <img
            src={video.channelAvatar}
            className="w-10 h-10 rounded-full"
            alt={video.channel}
          />

          <div>
            <p className="font-medium">{video.channel}</p>
            <p className="text-sm text-gray-500">
              {video.views} views
            </p>
          </div>
        </div>

        <button className="px-4 py-2 rounded-full bg-black text-white">
          Subscribe
        </button>
      </div>
    </div>
  )
}
