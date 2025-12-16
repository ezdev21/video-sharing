import {
  Menu,
  Search,
  Mic,
  Bell,
  User,
  Plus,
} from "lucide-react"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full bg-white border-b">
      <div className="flex items-center justify-between px-4 h-14">

        {/* Left */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-1 cursor-pointer">
           
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex items-center flex-1 max-w-xl mx-6">
          <div className="flex flex-1">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
            />
            <button className="px-6 border border-l-0 border-gray-300 rounded-r-full bg-gray-100 hover:bg-gray-200">
              <Search size={18} />
            </button>
          </div>

          <button className="ml-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Mic size={18} />
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">

          {/* + Create */}
          <Link
            to="/channel/create"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100"
          >
            <Plus size={18} />
            <span className="hidden sm:inline text-sm font-medium">
              Create
            </span>
          </Link>

          {/* + Create */}
          <Link
            to="/video/create"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100"
          >
            <Plus size={18} />
            <span className="hidden sm:inline text-sm font-medium">
              Upload
            </span>
          </Link>

          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={22} />
          </button>

          <button className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">
            <User size={18} />
          </button>
        </div>

      </div>
    </header>
  )
}
