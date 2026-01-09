import VideoCard from "@/components/video/VideoCard"
import { useEffect } from "react"
import { VideoCardSkeleton } from "../components/ui/VideoCardSkeleton";
import { useVideoStore } from "@/store/video.store";

const  Home = () => {
  const { loading, videos, fetchVideos } = useVideoStore((state) => state);

  useEffect(() => {
    fetchVideos();
  },[fetchVideos])  

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
        ? Array.from({ length: 16 }).map((_, i) => (
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

export default Home;