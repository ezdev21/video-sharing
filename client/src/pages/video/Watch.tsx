import { useParams } from "react-router-dom"
import VideoPlayer from "@/components/video/VideoPlayer"
import RecommendedVideos from "@/components/video/RecommendedVideos"
import Comments from "@/components/video/Comments"
import type { Video } from "@/types"

const video: Video = {
  id: 1,
  title: "Build a YouTube Clone with React & Tailwind",
  thumbnail: "",
  channel: "Code Academy",
  channelAvatar: "https://i.pravatar.cc/150?img=1",
  views: "1.2M",
  time: "2 days ago",
  duration: "12:45",
}

const recommended: Video[] = [
  {
    id: 2,
    title: "React Router v6 Full Course",
    thumbnail: "https://picsum.photos/200/120?random=10",
    channel: "JS Mastery",
    channelAvatar: "",
    views: "900K",
    time: "1 week ago",
    duration: "18:30",
  },
  {
    id: 3,
    title: "Tailwind CSS Crash Course",
    thumbnail: "https://picsum.photos/200/120?random=11",
    channel: "DesignCourse",
    channelAvatar: "",
    views: "1.1M",
    time: "2 weeks ago",
    duration: "22:10",
  },
  {
    id: 4,
    title: "React Router v6 Full Course",
    thumbnail: "https://picsum.photos/200/120?random=10",
    channel: "JS Mastery",
    channelAvatar: "",
    views: "900K",
    time: "1 week ago",
    duration: "18:30",
  },
  {
    id: 5,
    title: "Tailwind CSS Crash Course",
    thumbnail: "https://picsum.photos/200/120?random=11",
    channel: "DesignCourse",
    channelAvatar: "",
    views: "1.1M",
    time: "2 weeks ago",
    duration: "22:10",
  },
]

export default function Watch() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="max-w-[1600px] mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left */}
        <div className="lg:col-span-8">
          <VideoPlayer video={video} />
          <Comments />
        </div>

        {/* Right */}
        <div className="lg:col-span-4">
          <RecommendedVideos videos={recommended} />
        </div>

      </div>
    </div>
  )
}
