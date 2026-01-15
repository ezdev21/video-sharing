import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router"
import dayjs from "dayjs";
import CustomModal from "../layout/CustomModal";
import { useAuthStore } from "@/store/auth.store";
import { useChannelStore } from "@/store/channel.store";
import { useVideoStore } from "@/store/video.store";
import { useQuery } from "@tanstack/react-query";

export default function VideoPlayer({ video }) {
  useChannelStore.setState({channelId: video.channel.id});
  const userId = useAuthStore(state => state.user?.id);
  const loggedIn = useAuthStore(state => state.loggedIn);
  const following = useChannelStore(state => state.following);
  const likeReactions = useVideoStore(state => state.likeReactions);
  const dislikeReactions = useVideoStore(state => state.dislikeReactions);
  const liked = useVideoStore(state => state.liked)
  const disliked = useVideoStore(state => state.disliked)
  const fetchChannel = useChannelStore(state => state.fetchChannel);
  const channelFollowing = useChannelStore(state => state.channelFollowing);
  const channelFollow = useChannelStore(state => state.channelFollow);
  const fetchVideoReactions = useVideoStore(state => state.fetchVideoReactions);
  const fetchUserReaction = useVideoStore(state => state.fetchUserReaction);
  const reactVideo = useVideoStore(state => state.reactToVideo)
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData,setModalData] = useState({
    title: '',
    description: '',
    redirectText: 'Login',
    redirectLink: '/login'
  });
  
  const {error:channelError, isLoading:channelIsLoading, data:channel } = useQuery({
    queryKey: ['channel',video.channel.id],
    queryFn: fetchChannel
  })

  const { error:videoReactionError, isLoading:videoReactionIsLoading, data:VideoReactions } = useQuery({
    queryKey: ['video',video.id, 'reactions'],
    queryFn: fetchVideoReactions
  })

  if(userId){
    useChannelStore.setState({userId: userId});
    const {error:channelFollowingError, isLoading:channelFollowingISLoading, data:channelFollowingData } = useQuery({
      queryKey: ['channel',video.channel.id, 'following'],
      queryFn: channelFollowing
    });

    const {error:videoUserReactionError, isLoading:videouserReactionIsLoading, data:userReaction } = useQuery({
      queryKey: ['video',video.channel.id, 'user-reaction'],
      queryFn: () => fetchUserReaction(userId)
    });
  }

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

      <h1 className="mt-4 text-lg font-semibold dark:text-gray-300">
        {video?.title}
      </h1>

      <div>
        <div className="flex items-center mt-2 mb-4 gap-6 border-b-2 border-gray-300 dark:border-gray-600 pb-2">
          <div className="flex items-end gap-4">
            <div className="flex items-end gap-1">
              <button onClick={() => likeVideo(video?.id)}>
                <ThumbsUp className={`inline-block w-8 h-8 ${liked ? "fill-primary stroke-primary" : "text-gray-500"}`}/>
              </button>
              <span className="text-2xl text-gray-600 dark:text-gray-400">{likeReactions}</span>
            </div>
            <div className="flex items-end gap-1">
              <button onClick={() => dislikeVideo(video?.id)}>
                <ThumbsDown className={`inline-block w-8 h-8 ${disliked ? "fill-primary stroke-primary" : "text-gray-500"}`}/>
              </button>
              <span className="text-2xl text-gray-600 dark:text-gray-400">{dislikeReactions}</span>
            </div>
          </div>
          <div>
            <p className="text-gray-700 text-md dark:text-gray-400">{video.views} views • {dayjs(video?.createdAt).fromNow()}</p>
          </div>
        </div>
        <div>
          <p className="mt-2 bg-gray-200 rounded-md p-3 my-3 dark:text-gray-300 dark:bg-gray-800">{video?.description}</p>
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
              <p className="font-medium dark:text-gray-300">{video?.channel?.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
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
