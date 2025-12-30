import { Plus, Video, Home, Flame, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar({
  user,
  sidebarOpen,
  toggleSidebar,
}: {
  user: { name: string; avatarUrl: string } | null;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  if (!sidebarOpen) {
    return null;
  }

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-4 px-6 py-3 transition-colors
     ${
       isActive
         ? "bg-gray-200 text-primary font-semibold"
         : "hover:bg-gray-200 text-gray-700"
     }`;

  return (
    <aside className="fixed top-0 z-50 left-0 h-full w-60 bg-white border-r shadow-md flex flex-col transition-all duration-300">
      {/* Logo */}
      <div className="text-2xl font-bold px-6 py-4 border-b h-14 flex items-center gap-4">
        <button
          className="p-2 rounded-full hover:bg-gray-300"
          onClick={toggleSidebar}
        >
          <Menu size={22} />
        </button>
        <span className="text-primary font-bold text-xl">ViParta</span>
      </div>

      {/* User */}
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
        <NavLink
          to="/"
          end
          onClick={toggleSidebar}
          className={navLinkClasses}
        >
          <Home size={20} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/trending"
          onClick={toggleSidebar}
          className={navLinkClasses}
        >
          <Flame size={20} />
          <span>Trending</span>
        </NavLink>
      </nav>

      <hr className="my-4 border-gray-200" />

      {/* Actions */}
      <nav className="flex flex-col gap-1">
        <NavLink
          to="/channel/create"
          onClick={toggleSidebar}
          className={navLinkClasses}
        >
          <Plus size={20} />
          <span>Create Channel</span>
        </NavLink>

        <NavLink
          to="/video/upload"
          onClick={toggleSidebar}
          className={navLinkClasses}
        >
          <Video size={20} />
          <span>Upload Videos</span>
        </NavLink>
      </nav>
    </aside>
  );
}
