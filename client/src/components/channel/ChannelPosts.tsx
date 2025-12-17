import type { Post } from "@/types";

const posts: Post[] = [
  { id: 1, content: "Just uploaded a new React tutorial!", date: "1 day ago" },
  { id: 2, content: "Learning TypeScript is fun!", date: "3 days ago" },
];

export default function ChannelPosts() {
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
