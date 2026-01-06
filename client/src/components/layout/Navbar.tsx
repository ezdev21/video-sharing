import { useState, useRef, useEffect } from "react";
import { Menu, Search, Mic, Bell, User, Plus } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuthStore } from "@/store/auth.store";

export default function Navbar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const q = searchParams.get("query") || "";

  const [query, setQuery] = useState(q);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const logout = useAuthStore(state => state.logout);
  const accountRef = useRef<HTMLDivElement | null>(null);

  const loggedIn = useAuthStore(state => state.loggedIn);
  const user = useAuthStore(state => state.user);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  // Close account dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="fixed top-0 z-10 w-full bg-white border-b">
        <div className="flex items-center justify-between px-4 h-14">

          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-full hover:bg-gray-200"
              onClick={toggleSidebar}
            >
              <Menu size={22} />
            </button>

            <Link to="/" className="font-bold text-xl text-primary">
              ViParta
            </Link>
          </div>

          {/* Center - Search */}
          <div className="flex items-center flex-1 max-w-xl mx-6">
            <form onSubmit={handleSearchSubmit} className="flex flex-1">
              <input
                type="search"
                placeholder="Search"
                required
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-l-full focus:outline-none focus:border-primary"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="submit"
                className="px-6 border border-l-0 border-gray-300 rounded-r-full bg-primary text-white hover:bg-primary/90"
              >
                <Search size={18} />
              </button>
            </form>

            <button className="ml-3 p-3 rounded-full bg-gray-200 hover:bg-gray-300">
              <Mic size={18} />
            </button>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {!loggedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-5 py-1 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-1 rounded-full bg-primary text-white hover:bg-primary/90 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/channel/create"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline text-sm">Create</span>
                </Link>

                <Link
                  to="/video/upload"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline text-sm">Upload</span>
                </Link>

                <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                  <Bell size={22} />
                </button>

                {/* Account Dropdown */}
                <div className="relative" ref={accountRef}>
                  <button
                    onClick={() => setAccountOpen(prev => !prev)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 font-semibold hover:bg-gray-400"
                  >
                    {user ? user.name.charAt(0).toUpperCase() : <User size={18} />}
                  </button>

                  {accountOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setAccountOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setAccountOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          setAccountOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <a href="/">Logout</a>
                      </button>
                    </div>
                  )}
                </div>
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
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </>
  );
}
