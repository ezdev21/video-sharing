import { useChannelStore } from "@/store/channel.store";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { VideoCardSkeleton } from "../ui/VideoCardSkeleton";
import type { Post } from "@/types";

export default function ChannelPosts() {
  const { id } = useParams<{ id: string }>()
  useChannelStore.setState({channelId: id});
  const fetchChannelPosts = useChannelStore((state) => state.fetchChannelPosts)
  
  const { error, isLoading, data:channelPosts } = useQuery({
    queryKey: ['channel',id,'posts'],
    queryFn: fetchChannelPosts
  })
  
  if(error){
    return (
      <div className="p-5 text-xl dark:text-gray-300">error loading channel posts</div>
    )
  }
  
  if(!channelPosts?.length){
    return (
      <div className="p-5 text-xl dark:text-gray-300">this channel has no posts</div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      {isLoading
      ? Array.from({ length: 16 }).map((_, i) => (
        <VideoCardSkeleton key={i} />
        ))
      : channelPosts.map((post:Post) => (
        <div key={post.id} className="border p-4 rounded">
          <p>{post.content}</p>
          <span className="text-sm text-gray-500">{dayjs(post.createdAt).fromNow()}</span>
        </div>
        ))
      }
    </div>
  )
}
