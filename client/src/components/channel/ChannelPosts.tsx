import api from "@/lib/api";
import type { Post } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ChannelPosts() {
  const { id } = useParams<{ id: string }>()
  const [posts, setPosts] = useState<Post[]>([]);
  
  const fetchPosts = async () => {
    await api.get(`/channel/${id}/posts`)
    .then((res) => {
      setPosts(res.data);
    }).catch((error) => {
      console.error('Error fetching channel posts:', error);
    })
  }
  
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-4 space-y-4">
      {posts.map(post => (
        <div key={post.id} className="border p-4 rounded">
          <p>{post.content}</p>
          <span className="text-sm text-gray-500">{post.date}</span>
        </div>
      ))}
    </div>
  )
}
