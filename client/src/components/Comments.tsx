interface Comment {
  id: number
  user: string
  avatar: string
  text: string
  time: string
}

const comments: Comment[] = [
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
]

export default function Comments() {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">
        {comments.length} Comments
      </h2>

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

              <p className="text-sm mt-1">
                {comment.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
