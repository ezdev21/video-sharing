import type { Video } from "@/types";
import VideoCard from "../video/VideoCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/api";

export default function ChannelVideos() {
  const { id } = useParams<{ id: string }>()
  const [videos, setVideos] = useState<Video[]>([]);

  const fetchVideos = async () => {
    await api.get(`/channel/${id}/videos`)
    .then((res) => {
      setVideos(res.data);
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
