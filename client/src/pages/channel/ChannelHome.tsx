import { Outlet } from "react-router-dom";
import ChannelHeader from "@/components/channel/ChannelHeader";
import ChannelTabs from "@/components/channel/ChannelTabs";

export default function ChannelHome() {
  return (
    <div>
      <ChannelHeader
        name="My Channel"
        avatar="https://i.pravatar.cc/150?img=5"
        subscribers="1.2M"
      />
      <ChannelTabs />
      <Outlet /> {/* Render Videos, Playlists, or Posts here */}
    </div>
  )
}
