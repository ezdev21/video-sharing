import { useParams } from "react-router-dom";
import { useChannelStore } from "@/store/channel.store";
import { useQuery } from "@tanstack/react-query";

export default function ChannelHeader() {
  const { id } = useParams<{ id: string }>();
  useChannelStore.setState({channelId: id});
  const fetchChannel = useChannelStore((state) => state.fetchChannel)

  const { error, isLoading, data:channel } = useQuery({
    queryKey: ['channel',id],
    queryFn: fetchChannel
  })

  if(error){
    return (
      <div>error loading channel info</div>
    )
  }

  if(isLoading){
    return <div>loading...</div>
  }
  return (
    <>
      <div className="h-40 bg-gray-200 mb-4">
        <img 
          src={`${import.meta.env.VITE_API_URL}/uploads/channels/background/${channel?.background}`}
          className="w-full h-full object-cover" alt="channel background"
        />
      </div>
      <div className="flex items-center gap-4 p-4">
        <img 
          src={`${import.meta.env.VITE_API_URL}/uploads/channels/avatar/${channel?.avatar}`}
          className="w-16 h-16 rounded-full" alt={channel?.name}
        />
        <div>
          <h1 className="text-xl font-bold dark:text-gray-300">{channel?.name}</h1>
          <p className="text-md text-gray-500">{channel?.followers} followers • {channel?.totalVideos} videos</p>
        </div>
      </div>
    </>
  )
}
