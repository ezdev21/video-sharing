import { usePostStore } from "@/store/usePostStore";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ChannelPosts() {
  const { id } = useParams<{ id: string }>()
  usePostStore.setState({id: id})
  const posts = usePostStore((state) => state.posts);
  const fetchPosts = usePostStore((state) => state.fetchPosts)
  
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="p-4 space-y-4">
      {posts.map(post => (
        <div key={post.id} className="border p-4 rounded">
          <p>{post.content}</p>
          <span className="text-sm text-gray-500">{dayjs(post.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  )
}
