import VideoCard from "@/components/VideoCard"
import type { Video } from "@/types/video"

const videos: Video[] = [
  {
    id: 1,
    title: "Build a YouTube Clone with React & Tailwind",
    thumbnail: "https://picsum.photos/400/225?random=1",
    channel: "Code Academy",
    channelAvatar: "https://i.pravatar.cc/150?img=1",
    views: "1.2M",
    time: "2 days ago",
    duration: "12:45",
  },
  {
    id: 2,
    title: "JavaScript Interview Questions You Must Know",
    thumbnail: "https://picsum.photos/400/225?random=2",
    channel: "JS Mastery",
    channelAvatar: "https://i.pravatar.cc/150?img=2",
    views: "850K",
    time: "1 week ago",
    duration: "18:30",
  },
  {
    id: 3,
    title: "React Router v6 Complete Guide",
    thumbnail: "https://picsum.photos/400/225?random=3",
    channel: "Frontend Simplified",
    channelAvatar: "https://i.pravatar.cc/150?img=3",
    views: "640K",
    time: "3 weeks ago",
    duration: "25:10",
  },
  {
    id: 4,
    title: "Tailwind CSS in 20 Minutes",
    thumbnail: "https://picsum.photos/400/225?random=4",
    channel: "DesignCourse",
    channelAvatar: "https://i.pravatar.cc/150?img=4",
    views: "1.8M",
    time: "1 month ago",
    duration: "20:00",
  },
]

export default function Home() {
  return (
    <div className="max-w-[1400px] mx-auto">
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
