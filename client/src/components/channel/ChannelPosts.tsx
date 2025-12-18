import type { Post } from "@/types";
import { useEffect, useState } from "react";

export default function ChannelPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  
  const fetchPosts = async () => {
    const res = await fetch(`http://localhost:3000/channel/1/posts`)
    .then(res => res.json())
    .then((data: Post[]) => {
      setPosts(data);
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
