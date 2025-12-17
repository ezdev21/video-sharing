import type { Video } from "@/types";
import VideoCard from "../video/VideoCard";

const videos: Video[] = [
  { id: 1, title: "React Tutorial", thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg", views: "1.2M views", date: "2 days ago" },
  { id: 2, title: "TypeScript Basics", thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg", views: "500K views", date: "1 week ago" },
];

export default function ChannelVideos() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}
