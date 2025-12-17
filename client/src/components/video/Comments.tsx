import { useState } from "react";

interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

const initialComments: Comment[] = [
  {
    id: 1,
    user: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=10",
    text: "This video is amazing 🔥",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=11",
    text: "Helped me a lot, thanks!",
    time: "1 day ago",
  },
];

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      user: "Anonymous",
      avatar: "https://i.pravatar.cc/150?img=12", // placeholder avatar
      text: newComment,
      time: "Just now",
    };

    setComments([comment, ...comments]);
    setNewComment(""); // clear textarea
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">
        {comments.length} Comments
      </h2>

      {/* Add Comment Textarea */}
      <div className="mb-4">
        <textarea
          className="w-full border rounded p-2 text-sm"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-blue-700"
        >
          Comment
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <img
              src={comment.avatar}
              className="w-9 h-9 rounded-full"
              alt={comment.user}
            />
            <div>
              <p className="text-sm font-medium">
                {comment.user}
                <span className="ml-2 text-xs text-gray-500">
                  {comment.time}
                </span>
              </p>
              <p className="text-sm mt-1">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
