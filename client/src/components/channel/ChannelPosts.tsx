import { useChannelStore } from "@/store/channel.store";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ChannelPosts() {
  const { id } = useParams<{ id: string }>()
  const channelPosts = useChannelStore((state) => state.channelPosts)
  const fetchChannelPosts = useChannelStore((state) => state.fetchChannelPosts)
  
  useEffect(() => {
    useChannelStore.setState({channelId: id});
    fetchChannelPosts();
  }, [id,fetchChannelPosts]);
  
  if(!channelPosts.length){
    return (
      <h1 className="p-5 text-xl">Channel has no posts</h1>
    )
  }

  return (
    <div className="p-4 space-y-4">
      {channelPosts.map(post => (
        <div key={post.id} className="border p-4 rounded">
          <p>{post.content}</p>
          <span className="text-sm text-gray-500">{dayjs(post.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  )
}
