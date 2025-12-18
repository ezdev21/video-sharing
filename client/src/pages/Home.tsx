import VideoCard from "@/components/video/VideoCard"
import type { Video } from "@/types/"
import { useEffect, useState } from "react"

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  
  const fetchVideos = async () =>{
    const res = await fetch('http://localhost:3000/videos')
    .then(res => res.json())
    .then((data: Video[]) => {
      setVideos(data);
    }).catch((error) => {
      console.error('Error fetching videos:', error);
    })
  }

  useEffect(() => {
    fetchVideos();
  })  

  return (
    <div className="max-w-[1400px] mx-5">
      <div
        className="
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        "
      >
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  )
}
