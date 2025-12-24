import { useState } from "react";
import { Menu, Search, Mic, Bell, User, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <>
      <header className="fixed top-0 z-10 w-full bg-white border-b">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-full hover:bg-gray-100"
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
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:outline-2 focus:border-primary"
              />
              <button className="px-6 border border-l-0 border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200">
                <Search size={18} />
              </button>
            </div>

            <button className="ml-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <Mic size={18} />
            </button>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Link
              to="/channel/create"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100"
            >
              <Plus size={18} />
              <span className="hidden sm:inline text-sm font-medium">Create</span>
            </Link>

            <Link
              to="/video/upload"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100"
            >
              <Plus size={18} />
              <span className="hidden sm:inline text-sm font-medium">Upload</span>
            </Link>

            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={22} />
            </button>

            <button className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white">
              <User size={18} />
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
