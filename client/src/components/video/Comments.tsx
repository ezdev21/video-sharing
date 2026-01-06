import { useAuthStore } from "@/store/auth.store";
import { useCommentStore } from "@/store/comment.store";
import dayjs from "dayjs";
import { UserCircle2 } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import CustomModal from "../layout/CustomModal";

export default function Comments({id}:{id:string}) {
  const comments = useCommentStore((state) => state.comments);
  const newComment = useCommentStore((state) => state.newComment);
  const fetchComments = useCommentStore((state) => state.fetchComments);
  const addComment = useCommentStore((state) => state.addComment);
  const loggedIn = useAuthStore(state => state.loggedIn);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData,setModalData] = useState({
    title: '',
    description: '',
    redirectText: 'Login',
    redirectLink: '/login'
  });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if(loggedIn){
      addComment()
    }
    else{
      setShowModal((showModal) => !showModal);
      setModalData(modalData =>({
        ...modalData,
        title: "want to give comment?",
        description: "Login or create account to give comment on this video"
      }));
    }
  }
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
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
      <div className="mb-4">
        <textarea
          className="w-full border rounded p-2 text-sm focus:border-2 focus:outline-none focus:border-primary"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => useCommentStore.setState({newComment: e.target.value})}
          required
        />
        <button
          type="submit"
          className="mt-2 px-4 py-1 bg-primary hover:bg-primary/90  text-white rounded-full"
        >
          Comment
        </button>
      </div>
      </form>

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

      {showModal && (
        <CustomModal 
          title={modalData.title}
          description={modalData.description}
          redirectText={modalData.redirectText}
          redirectLink={modalData.redirectLink}
        />
      )}

    </div>
  );
}
