import { useEffect, useState } from "react";

interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

export default function Comments({id}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  
  const fetchComments = async () =>{
      const res = await fetch(`http://localhost:3000/video/${id}/comments`)
      .then(res => res.json())
      .then((data: Comment[]) => {
        setComments(data);
      }).catch((error) => {
        console.error('Error fetching comments:', error);
      })
    }

  useEffect(() => {
    fetchComments();
  }, []);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    const res = await fetch('http://localhost:3000/video/comments/add')
      .then(res => res.json())
      .then((data: Comment) => {
        setComments([data, ...comments]);
      }).catch((error) => {
        console.error('Error adding a new comment:', error);
      })

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
