import { useParams } from "react-router-dom"
import VideoPlayer from "@/components/video/VideoPlayer"
import RecommendedVideos from "@/components/video/RecommendedVideos"
import Comments from "@/components/video/Comments"
import { useEffect, useState } from "react"
import { useVideoStore } from "@/store/video.store"

export default function Watch() {
  const { id } = useParams<{ id: string }>()
  useVideoStore.setState({currentVideoId: id});
  const video = useVideoStore(state => state.currentVideo);
  const recommended = useVideoStore(state => state.recommendedVideos);
  const fetchVideo = useVideoStore(state => state.fetchVideo);
  const fetchRecommendedVideos = useVideoStore(state => state.fetchRecommendedVideos);
  const [viewed, setViewed] = useState(false);

  useEffect(() => {
    if (!viewed) {
      fetchVideo(); // increments views
      setViewed(true);
    }
    fetchRecommendedVideos();
  },[id, viewed]);

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left */}
        <div className="lg:col-span-8">
          {video && <VideoPlayer video={video} />}
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
