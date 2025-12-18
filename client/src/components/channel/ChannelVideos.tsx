import type { Video } from "@/types";
import VideoCard from "../video/VideoCard";
import { useEffect, useState } from "react";

export default function ChannelVideos() {
  const [videos, setVideos] = useState<Video[]>([]);

  const fetchVideos = async () => {
    const res = await fetch(`http://localhost:3000/channel/1/videos`)
    .then(res => res.json())
    .then((data: Video[]) => {
      setVideos(data);
    }).catch((error) => {
      console.error('Error fetching channel videos:', error);
    })
  }
  
  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}
