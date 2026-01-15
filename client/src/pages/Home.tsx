import VideoCard from "@/components/video/VideoCard"
import { useEffect } from "react"
import { VideoCardSkeleton } from "../components/ui/VideoCardSkeleton";
import { useVideoStore } from "@/store/video.store";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

const  Home = () => {
  const { fetchVideos } = useVideoStore((state) => state);
  const {error, isLoading, data:videos } = useQuery({
    queryKey: ['video'],
    queryFn: async () => await fetchVideos(),
  })
  useEffect(() => {
    if(error){
      const id = toast.error("Server error. please try again", {
        position: "bottom-right",
        richColors: true,
        dismissible: true,
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(id),
        },
      });
    }
  },[error])  

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
        {isLoading
        ? Array.from({ length: 16 }).map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))
        : videos?.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))
        }
      </div>
    </div>
  )
}

export default Home;