import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useChannelStore } from "@/store/useChannelStore";

export default function ChannelHeader() {
  const { id } = useParams<{ id: string }>()
  useChannelStore.setState({id: id})
  const channel = useChannelStore((state) => state.channel);
  const fetchChannel = useChannelStore((state) => state.fetchChannel)
  
  useEffect(() => {
    fetchChannel();
  }, [fetchChannel])

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
