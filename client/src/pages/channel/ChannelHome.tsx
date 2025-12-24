import { Outlet } from "react-router-dom";
import ChannelHeader from "@/components/channel/ChannelHeader";
import ChannelTabs from "@/components/channel/ChannelTabs";
import { useEffect, useState } from "react";
import type { Channel } from "@/types";

export default function ChannelHome() {
  const [channel, setChannel] = useState<Channel>({});
  
  const fetchChannel = async () => {
    await fetch('http://localhost:3000/channel/1')
    .then(res => res.json())
    .then((data: Channel) => {
      setChannel(data);
    }).catch((error) => {
      console.error('Error fetching channel videos:', error);
    })
  }
  
  useEffect(() => {
    fetchChannel();
  }, [])

  return (
    <div>
      <ChannelHeader
        name={channel?.name}
        avatar={channel?.avatar}
        subscribers={channel?.subscribers}
      />
      <ChannelTabs />
      <Outlet /> {/* Render Videos, Playlists, or Posts here */}
    </div>
  )
}
