import { useCommentStore } from "@/store/useCommentStore";
import { useEffect } from "react";

export default function Comments({id}) {
  const comments = useCommentStore((state) => state.comments);
  const newComment = useCommentStore((state) => state.newComment);
  const fetchComments = useCommentStore((state) => state.fetchComments);
  const addComment = useCommentStore((state) => state.addComment);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

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
          onChange={(e) => useCommentStore.setState({newComment: e.target.value})}
        />
        <button
          onClick={addComment}
          className="mt-2 px-4 py-2 bg-primary hover:bg-primary/90  text-white rounded "
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
