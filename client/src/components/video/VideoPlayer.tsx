import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router"
import dayjs from "dayjs";
import CustomModal from "../layout/CustomModal";
import { useAuthStore } from "@/store/auth.store";
import { useChannelStore } from "@/store/channel.store";
import { useVideoStore } from "@/store/video.store";

export default function VideoPlayer({ video }) {
  useChannelStore.setState({channelId: video.channel.id});
  const userId = useAuthStore(state => state.user?.id);
  const loggedIn = useAuthStore(state => state.loggedIn);
  const following = useChannelStore(state => state.following);
  let likeReactions = useVideoStore(state => state.likeReactions);
  let dislikeReactions = useVideoStore(state => state.dislikeReactions);
  const liked = useVideoStore(state => state.liked)
  const disliked = useVideoStore(state => state.disliked)
  const fetchChannel = useChannelStore(state => state.fetchChannel);
  const channelFollowing = useChannelStore(state => state.channelFollowing);
  const channelFollow = useChannelStore(state => state.channelFollow);
  const fetchVideoReacts = useVideoStore(state => state.fetchVideoReacts);
  const fetchUserReaction = useVideoStore(state => state.fetchUserReaction);
  const reactVideo = useVideoStore(state => state.reactVideo)
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData,setModalData] = useState({
    title: '',
    description: '',
    redirectText: 'Login',
    redirectLink: '/login'
  });
  
  useEffect(()=>{
    fetchChannel();
    fetchVideoReacts();
    if(userId){
      useChannelStore.setState({userId: userId});
      channelFollowing();
      fetchUserReaction(userId);
    }
  },[userId, fetchChannel, channelFollowing, fetchVideoReacts, fetchUserReaction])

  const follow = () =>{
    if(loggedIn){
      channelFollow();
      useChannelStore.setState({following: !following});
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

  const likeVideo = () => {
    if(userId){
      reactVideo(userId,'LIKE')
      if(liked){
        useVideoStore.setState({likeReactions: likeReactions-1})
      }
      else{
        useVideoStore.setState({likeReactions: likeReactions+1})
        if(disliked){
          useVideoStore.setState({dislikeReactions: dislikeReactions-1})
        }
      }
      useVideoStore.setState({liked: !liked})
      if (disliked) {
        useVideoStore.setState({disliked: false})
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
  
  const dislikeVideo = () => {
    if(userId){
      reactVideo(userId,'DISLIKE')
      if(disliked){
        useVideoStore.setState({dislikeReactions: dislikeReactions-1})
      }
      else{
        useVideoStore.setState({dislikeReactions: dislikeReactions+1})
        if(liked){
          useVideoStore.setState({likeReactions: likeReactions-1})
        }
      }
      useVideoStore.setState({disliked: !disliked})
      if (liked) {
        useVideoStore.setState({liked: false})
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

      <div className="w-full aspect-video bg-black rounded-md overflow-hidden">
        <video
          src={`${import.meta.env.VITE_API_URL}/uploads/videos/video/${video?.src}`}
          className="w-full h-full"
          controls
        />
      </div>

      <h1 className="mt-4 text-lg font-semibold">
        {video?.title}
      </h1>

      <div>
        <div className="flex items-center mt-2 mb-4 gap-6 border-b-2 border-gray-300 pb-2">
          <div className="flex items-center gap-4">
            <button onClick={() => likeVideo(video?.id)}>
              <ThumbsUp className={`inline-block w-8 h-8 ${liked ? "fill-primary stroke-primary" : "text-gray-500"}`}/>
              {likeReactions}
            </button>
            <button onClick={() => dislikeVideo(video?.id)}>
                <ThumbsDown className={`inline-block w-8 h-8 ${disliked ? "fill-primary stroke-primary" : "text-gray-500"}`}/>
                {dislikeReactions}
            </button>
          </div>
          <div>
            <p className="text-gray-700">{video.views} views {dayjs(video?.createdAt).fromNow()}</p>
          </div>
        </div>
        <div>
          <p className="mt-2 bg-gray-200 rounded-md p-3 my-3">{video?.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-3">
          <Link to={`/channel/${video?.channel?.id}`} className="flex items-center gap-3">
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/channels/avatar/${video?.channel?.avatar}`}
              className="w-10 h-10 rounded-full"
              alt={video?.channel?.name}
            />
            <div>
              <p className="font-medium">{video?.channel?.name}</p>
              <p className="text-sm text-gray-500">
                {video?.channel?.followers} followers
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
