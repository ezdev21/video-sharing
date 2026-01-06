import { useCommentStore } from "@/store/comment.store";
import dayjs from "dayjs";
import { UserCircle2 } from "lucide-react";
import { useEffect } from "react";

export default function Comments({id}:{id:string}) {
  const comments = useCommentStore((state) => state.comments);
  const newComment = useCommentStore((state) => state.newComment);
  const fetchComments = useCommentStore((state) => state.fetchComments);
  const addComment = useCommentStore((state) => state.addComment);

  useEffect(() => {
    useCommentStore.setState({videoId: id});
    fetchComments();
  }, [id,fetchComments]);

  return (
    <div className="my-6">
      <h2 className="text-lg font-semibold mb-4">
        {comments.length} Comments
      </h2>

      {/* Add Comment Textarea */}
      <div className="mb-4">
        <textarea
          className="w-full border rounded p-2 text-sm focus:border-2 focus:outline-none focus:border-primary"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => useCommentStore.setState({newComment: e.target.value})}
        />
        <button
          onClick={addComment}
          className="mt-2 px-4 py-1 bg-primary hover:bg-primary/90  text-white rounded-full"
        >
          Comment
        </button>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-center gap-3">
            {comment.user?.avatar
            ?<img
              src={comment.user?.avatar}
              className="w-9 h-9 rounded-full"
              alt={comment.user}
            />
            :<UserCircle2 className="w-9 h-9 rounded-full"/>
            }
            <div>
              <div className="flex items-center gap-1 text-gray-600">
                <span className="text-sm font-medium">
                  {comment.user?.name}
                </span>
                <span className="text-gray-500 text-xs">•</span>
                <span className="text-xs">
                  {dayjs(comment.createdAt).fromNow()}
                </span>
              </div>
              <p className="text-sm">{comment.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
