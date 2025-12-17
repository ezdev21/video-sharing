import { NavLink } from "react-router-dom";

export default function ChannelTabs() {
  const activeClass = "border-b-2 border-blue-600 text-blue-600";
  const inactiveClass = "text-gray-600";

  return (
    <div className="flex gap-4 px-4 border-b">
      <NavLink to="videos" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
        Videos
      </NavLink>
      <NavLink to="playlists" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
        Playlists
      </NavLink>
      <NavLink to="posts" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
        Posts
      </NavLink>
    </div>
  )
}
