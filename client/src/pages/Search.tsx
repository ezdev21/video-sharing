import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useVideoStore } from "@/store/video.store";
import VideoCard from "@/components/video/VideoCard";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || '';
  useVideoStore.setState({query: query});
  const searchedVideos = useVideoStore((state) => state.searchedVideos);
  const searchVideos = useVideoStore((state) => state.searchVideos);

  useEffect(() => {
   searchVideos()
  },[searchVideos]);
  
  if(searchedVideos.length == 0) {
    return <div className="p-4 text-center text-gray-500 text-xl">No videos found for "{query}"</div>
  } else {
  return (
    <>
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          { searchedVideos.map((video) => (
            <VideoCard key={video.id} video={video} />   
          ))}
        </div>
      </div>
    </>
  )
  }
}

export default Search