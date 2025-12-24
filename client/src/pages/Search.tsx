import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Video } from "../types";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [videos, setVideos] = useState<Video[]>([]);
  
  useEffect(() => {
    fetch(`http://localhost:3000/video/search?query=${query}`)
      .then(res => res.json())
      .then((videos: Video[]) => {
        setVideos(videos);
      }).catch((err: unknown) => {
        console.error('Error fetching videos:', err);
      })
  }, []);
  
  if(videos.length == 0) {
    return <div className="p-4 text-center text-gray-500 text-xl">No videos found for "{query}"</div>
  } else {
  return (
    <>
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <Link to={`/video/${video.id}`} key={video.id}>
              <div key={video.id} className="rounded overflow-hidden shadow hover:shadow-lg transition">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-2 text-sm font-medium">{video.title}</div>
            </div>
            </Link>  
          ))}
        </div>
      </div>
    </>
  )
  }
}

export default Search