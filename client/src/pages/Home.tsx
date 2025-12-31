import VideoCard from "@/components/video/VideoCard"
import { useEffect } from "react"
import { VideoCardSkeleton } from "../components/ui/VideoCardSkeleton";
import { useVideoStore } from "@/store/useVideoStore";

export default function Home() {
  const loading = useVideoStore((state) => state.loading);
  const videos = useVideoStore((state) => state.videos);
  const fetchVideos = useVideoStore((state) => state.fetchVideos)

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
        ? Array.from({ length: 8 }).map((_, i) => (
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
