import { useParams } from "react-router-dom"
import VideoPlayer from "@/components/video/VideoPlayer"
import RecommendedVideos from "@/components/video/RecommendedVideos"
import Comments from "@/components/video/Comments"
import type { Video } from "@/types"
import { useEffect, useState } from "react"

export default function Watch() {
  const { id } = useParams<{ id: string }>()
  const [video, setVideo] = useState<Video | null>(null)
  const [recommended, setRecommended] = useState<Video[]>([])

  const fetchVideo = async () => {
    await fetch(`http://localhost:3000/video/${id}`)
    .then(res => res.json())
    .then((data: Video) => {
      setVideo(data);
    }).catch((error) => {
      console.error('Error fetching videos:', error);
    })
  }
  
  const fetchRecommendedVideos = async () => {
    await fetch(`http://localhost:3000/video/${id}/recommended`)
    .then(res => res.json())
    .then((data: Video[]) => {
      setRecommended(data);
    }).catch((error) => {
      console.error('Error fetching videos:', error);
    })
  }

  useEffect(() => {
    fetchVideo();
    fetchRecommendedVideos();
  })

  return (
    <div className="max-w-[1600px] mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left */}
        <div className="lg:col-span-8">
          <VideoPlayer video={video} />
          <Comments id={id} />
        </div>

        {/* Right */}
        <div className="lg:col-span-4">
          <RecommendedVideos videos={recommended} />
        </div>

      </div>
    </div>
  )
}
