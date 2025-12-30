import { useEffect, useState } from "react";
import type { Channel } from "../../types";
import { useParams } from "react-router-dom";
import api from "@/lib/api";

export default function ChannelHeader() {
  const { id } = useParams<{ id: string }>()
  const [channel, setChannel] = useState<Channel | null>(null);
  
  const fetchChannel = async () => {
    await api.get(`/channel/${id}`)
    .then((res) => {
      setChannel(res.data);
    }).catch((error) => {
      console.error('Error fetching channel videos:', error);
    })
  }
  
  useEffect(() => {
    fetchChannel();
  }, [])

  return (
    <>
      <div className="h-40 bg-gray-200 mb-4">
        <img 
          src={`http://localhost:3000/uploads/channels/background/${channel?.background}`}
          className="w-full h-full object-cover" alt="channel background"
        />
      </div>
      <div className="flex items-center gap-4 p-4">
        <img 
          src={`http://localhost:3000/uploads/channels/avatar/${channel?.avatar}`}
          className="w-16 h-16 rounded-full" alt={channel?.name}
        />
        <div>
          <h1 className="text-xl font-bold">{channel?.name}</h1>
          <p className="text-md text-gray-500">{channel?.subscribers} subscribers • {channel?.videos?.length} videos</p>
        </div>
      </div>
    </>
  )
}
