import { Video } from "../../types/video"

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
          <img
            src={video.thumbnail}
            className="w-40 h-24 object-cover rounded-lg"
            alt={video.title}
          />

          <div>
            <h3 className="text-sm font-semibold line-clamp-2">
              {video.title}
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              {video.channel}
            </p>

            <p className="text-xs text-gray-500">
              {video.views} views • {video.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
