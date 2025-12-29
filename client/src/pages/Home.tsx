import VideoCard from "@/components/video/VideoCard"
import type { Video } from "@/types/"
import { useEffect, useState } from "react"
import { VideoCardSkeleton } from "../components/ui/VideoCardSkeleton";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchVideos = async () =>{
    await fetch('http://localhost:3000/video')
    .then(res => res.json())
    .then((data: Video[]) => {
      setVideos(data);
      setLoading(false);
    }).catch((error) => {
      console.error('Error fetching videos:', error);
    })
  }

  useEffect(() => {
    fetchVideos();
  })  

  return (
    <div className="max-w-[1400px]">
      <div
        className="
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        "
      >
        {loading
        ? Array.from({ length: 12 }).map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))
        : videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))
        }
      </div>
    </div>
  )
}
