import { useParams } from "react-router-dom"
import VideoPlayer from "@/components/video/VideoPlayer"
import RecommendedVideos from "@/components/video/RecommendedVideos"
import Comments from "@/components/video/Comments"
import { useVideoStore } from "@/store/video.store"
import { useQuery } from "@tanstack/react-query"

export default function Watch() {
  const { id } = useParams<{ id: string }>();
  useVideoStore.setState({currentVideoId: id});
  const fetchVideo = useVideoStore(state => state.fetchVideo);
  const fetchRecommendedVideos = useVideoStore(state => state.fetchRecommendedVideos);
  
  const { error:fetchVideoError, isLoading:fetchVideoIsLoading, data:video } = useQuery({
    queryKey: ['video', id],
    queryFn: fetchVideo
  })

  const { error:fetchRecommendedVideoError, isLoading:fetchRecommendedVideoIsLoading, data:recommended } = useQuery({
    queryKey: ['recommended-video', id],
    enabled: id!=null,
    queryFn: () => fetchRecommendedVideos(id)
  })

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-8">
          { video && <VideoPlayer video={video} /> }
          { id && <Comments id={id} /> }
        </div>

        <div className="lg:col-span-4">
          { recommended &&<RecommendedVideos videos={recommended} />}
        </div>

      </div>
    </div>
  )
}
