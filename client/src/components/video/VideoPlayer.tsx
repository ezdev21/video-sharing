import type { Video } from "@/types"
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router"

interface VideoPlayerProps {
  video: Video
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const likeVideo = (videoId: string) => {
    setLiked(!liked);
    if (disliked) {
      setDisliked(false);
    }
  }
  
  const dislikeVideo = (videoId: string) => {
    setDisliked(!disliked);
    if (liked) {
      setLiked(false);
    }
  }

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

      <div>
        <div className="flex items-center mt-2 mb-4 gap-6 border-b-2 border-gray-300 pb-2">
          <div className="flex items-center gap-4">
            <button onClick={() => likeVideo(video?.id)}>
              <ThumbsUp className={`inline-block w-8 h-8 ${liked ? "fill-primary stroke-primary" : "text-gray-500"}`}/>
              {video?.likes}
            </button>
            <button onClick={() => dislikeVideo(video?.id)}>
                <ThumbsDown className={`inline-block w-8 h-8 ${disliked ? "fill-primary stroke-primary" : "text-gray-500"}`}/>
                {video?.dislikes}
            </button>
          </div>
          <div>
            <p className="text-gray-700 text-xl font-medium">{video?.views} views {new Date(video?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div>
          <p className="mt-2 bg-gray-200 rounded-md p-3 my-3">{video?.description}</p>
        </div>
      </div>

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
                {video?.channel.subscribers} subscribers
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
