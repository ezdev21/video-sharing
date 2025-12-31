import { useState } from "react";
import { Menu, Search, Mic, Bell, User, Plus } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const q = searchParams.get("query") || "";
  const [query, setQuery] = useState<string>(q);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) return;

    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <header className="fixed top-0 z-10 w-full bg-white border-b">
        <div className="flex items-center justify-between px-4 h-14">
          
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-full hover:bg-gray-300"
              onClick={toggleSidebar}
            >
              <Menu size={22} />
            </button>

            <Link to="/" className="text-primary font-bold text-xl">
              <span className="text-primary">Vi</span>Parta
            </Link>
          </div>

          {/* Center - Search */}
          <div className="flex items-center flex-1 max-w-xl mx-6">
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-1"
            >
              <input
                type="search"
                placeholder="Search"
                required
                className="w-full px-4 py-2 text-sm border focus:border border-gray-300 rounded-l-md focus:outline-none focus:border-primary"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <button
                type="submit"
                className="px-6 border border-l-0 border-gray-300 rounded-r-md flex justify-center items-center bg-primary hover:bg-primary/90 text-white"
              >
                <Search size={18} />
              </button>
            </form>

            <button className="ml-3 p-3 rounded-full bg-gray-300 hover:bg-primary hover:bg-primary/90 hover:text-white">
              <Mic size={18} />
            </button>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
          { !user ? (
            <>
              <Link
                to="/login"
                className="px-5 py-1 rounded-full border border-primary text-primary hover:bg-primary hover:bg-primary/90 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-1 rounded-full bg-primary hover:bg-primary/90 text-white hover:bg-primary hover:bg-primary/90/90 transition"
              >
                Register
              </Link>
            </>
          ) : (
          <>
            <Link
              to="/channel/create"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 bg-gray-300 hover:bg-primary hover:bg-primary/90 hover:text-white"
            >
              <Plus size={18} />
              <span className="hidden sm:inline text-sm font-medium">Create</span>
            </Link>

            <Link
              to="/video/upload"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 bg-gray-300 hover:bg-primary hover:bg-primary/90 hover:text-white"
            >
              <Plus size={18} />
              <span className="hidden sm:inline text-sm font-medium">Upload</span>
            </Link>

            <button className="p-2 rounded-full bg-gray-300 hover:bg-primary hover:bg-primary/90 hover:text-white">
              <Bell size={22} />
            </button>

            <button className="p-2 rounded-full bg-gray-300 hover:bg-primary hover:bg-primary/90 hover:text-white">
              <User size={22} />
            </button>
          </>
  )}
</div>

        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar user={null} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}
