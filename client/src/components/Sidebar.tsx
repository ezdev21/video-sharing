import { Plus, Video, Home, Play, Flame, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar({ user, sidebarOpen }: { user: { name: string; avatarUrl: string } | null; sidebarOpen: boolean }) {
  if (!sidebarOpen) {
    return null;
  }
  return (
    <aside className="fixed top-0 z-50 left-0 h-full w-60 bg-white border-r shadow-md flex flex-col" >
      {/* Logo */}
      <div className="text-2xl font-bold px-6 py-4 border-b">
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          //onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={22} />
        </button>
        <span className="text-primary">Vi</span>Parta
      </div>

      {/* User Avatar & Name */}
      {user && (
        <div className="flex items-center gap-3 px-6 py-4 border-b">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium">{user.name}</span>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex flex-col mt-4 gap-1">
        <Link
          to="/"
          className="flex items-center gap-4 px-6 py-3 rounded-lg hover:bg-gray-100"
        >
          <Home size={20} />
          <span className="font-medium">Home</span>
        </Link>

        <Link
          to="/trending"
          className="flex items-center gap-4 px-6 py-3 rounded-lg hover:bg-gray-100"
        >
          <Flame size={20} />
          <span className="font-medium">Trending</span>
        </Link>

      </nav>

      <hr className="my-4 border-gray-200" />

      {/* Channel / Video Actions */}
      <nav className="flex flex-col gap-1">
        <Link
          to="/channel/create"
          className="flex items-center gap-4 px-6 py-3 rounded-lg hover:bg-gray-100"
        >
          <Plus size={20} />
          <span className="font-medium">Create Channel</span>
        </Link>

        <Link
          to="/video/upload"
          className="flex items-center gap-4 px-6 py-3 rounded-lg hover:bg-gray-100"
        >
          <Video size={20} />
          <span className="font-medium">Upload Videos</span>
        </Link>
      </nav>
    </aside>
  );
}
