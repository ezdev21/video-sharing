import { useState } from "react";
import { Menu, Search, Mic, Bell, User, Plus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("query") || "";
  const [query,setQuery] = useState<string>(q);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      window.location.href = `/search?query=${query}`;
    }
  }  

  return (
    <>
      <header className="fixed top-0 z-10 w-full bg-white border-b">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-full hover:bg-gray-300"
              onClick={() => toggleSidebar()}
            >
              <Menu size={22} />
            </button>

            <div>
              <Link to="/" className="text-primary font-bold text-xl">
                <span className="text-primary">Vi</span>Parta
              </Link>
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex items-center flex-1 max-w-xl mx-6">
            <div className="flex flex-1">
              <input
                type="search"
                placeholder="Search"
                className="w-full px-4 py-2 text-sm border focus:border-2 border-gray-300 rounded-l-md focus:outline-none focus:border-primary"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Link to={`/search?query=${query}`} className="px-6 border border-l-0 border-gray-300 rounded-r-md flex justify-center items-center bg-primary text-white hover:bg-hover">
                <Search size={18} />
              </Link>
            </div>

            <button className="ml-3 p-3 rounded-full bg-gray-300 hover:bg-hover hover:text-white">
              <Mic size={18} />
            </button>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <Link
              to="/channel/create"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 bg-gray-300 hover:bg-hover hover:text-white"
            >
              <Plus size={18} />
              <span className="hidden sm:inline text-sm font-medium">Create</span>
            </Link>

            <Link
              to="/video/upload"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 bg-gray-300 hover:bg-hover hover:text-white"
            >
              <Plus size={18} />
              <span className="hidden sm:inline text-sm font-medium">Upload</span>
            </Link>

            <button className="p-2 rounded-full bg-gray-300 hover:bg-hover hover:text-white">
              <Bell size={22} />
            </button>

            <button className="p-2 rounded-full bg-gray-300 hover:bg-hover hover:text-white">
              <User size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
     <Sidebar user={null} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}
