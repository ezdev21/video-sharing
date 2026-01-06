import type { Video } from "@/types"
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router"
import dayjs from "dayjs";
import CustomModal from "../layout/CustomModal";
import { useAuthStore } from "@/store/auth.store";
import { Description } from "@radix-ui/react-dialog";

interface VideoPlayerProps {
  video: Video
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const loggedIn = useAuthStore(state => state.loggedIn);
  const [liked, setLiked] = useState<boolean>(false);
  const [disliked, setDisliked] = useState<boolean>(false);
  const [following, setFollowing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  
  const [modalData,setModalData] = useState({
    title: '',
    description: '',
    redirectText: 'Login',
    redirectLink: '/login'
  });

  const follow = () =>{
    if(loggedIn){
      setFollowing((followed) => !followed);
    }
    else{
      setShowModal((showModal) => !showModal);
      setModalData(modalData =>({
        ...modalData,
        title: "Follow this channel?",
        description: "Login or create account to folllow this channel"
      }));
    }
  }

  const likeVideo = (videoId: string) => {
    if(loggedIn){
      setLiked(!liked);
      if (disliked) {
        setDisliked(false);
      }
    }
    else{
      setShowModal((showModal) => !showModal);
      setModalData(modalData =>({
        ...modalData,
        title: "Like this video?",
        description: "Login or create account to like this video"
      }));
    }
  }
  
  const dislikeVideo = (videoId: string) => {
    if(loggedIn){
      setDisliked(!disliked);
      if (liked) {
        setLiked(false);
      }
    }
    else{
      setShowModal((showModal) => !showModal);
      setModalData(modalData =>({
        ...modalData,
        title: "Disike this video?",
        description: "Login or create account to dislike this video"
      }));
    }
  }

  return (
    <div>
      {/* Video */}
      <div className="w-full aspect-video bg-black rounded-md overflow-hidden">
        <video
          src={`http://localhost:3000/uploads/videos/video/${video?.src}`}
          className="w-full h-full"
          controls
        />
      </div>

      {/* Video Info */}
      <h1 className="mt-4 text-lg font-semibold">
        {video?.title}
      </h1>

      <div>
        <div className="flex items-center mt-2 mb-4 gap-6 border-b-2 border-gray-300 pb-2">
          <div className="flex items-center gap-4">
            <button onClick={() => likeVideo(video?.id)}>
              <ThumbsUp className={`inline-block w-8 h-8 ${liked ? "fill-primary stroke-primary" : "text-gray-500"}`}/>
              {video?.likes}
            </button>
            <button onClick={() => dislikeVideo(video?.id)}>
                <ThumbsDown className={`inline-block w-8 h-8 ${disliked ? "fill-primary stroke-primary" : "text-gray-500"}`}/>
                {video?.dislikes}
            </button>
          </div>
          <div>
            <p className="text-gray-700">{video?.views} views {dayjs(video?.createdAt).fromNow()}</p>
          </div>
        </div>
        <div>
          <p className="mt-2 bg-gray-200 rounded-md p-3 my-3">{video?.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-3">
          <Link to={`/channel/${video?.channel.id}`} className="flex items-center gap-3">
            <img
              src={`http://localhost:3000/uploads/channels/avatar/${video?.channel.avatar}`}
              className="w-10 h-10 rounded-full"
              alt={video?.channel.name}
            />
            <div>
              <p className="font-medium">{video?.channel.name}</p>
              <p className="text-sm text-gray-500">
                {video?.channel.followers} followers
              </p>
            </div>
          </Link>
        </div>

        <button onClick={follow} className={`px-6 py-1 rounded-full font-semibold ${following? 'bg-gray-300 text-gray-600' : 'bg-primary text-white'}`}>
          {following? 'Following' : 'Follow' }
        </button>

        {showModal && (
          <CustomModal 
            title={modalData.title}
            description={modalData.description}
            redirectText={modalData.redirectText}
            redirectLink={modalData.redirectLink}
          />
        )}

      </div>
    </div>
  )
}
