import { Outlet } from "react-router-dom";
import ChannelHeader from "@/components/channel/ChannelHeader";
import ChannelTabs from "@/components/channel/ChannelTabs";

export default function ChannelHome() {
  

  return (
    <div>
      <ChannelHeader/>
      <ChannelTabs/>
      <Outlet />
    </div>
  )
}
