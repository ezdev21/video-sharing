import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Navbar from "./components/layout/Navbar"
import Watch from "./pages/video/Watch"
import VideoUpload from "./pages/video/VideoUpload"
import CreateChannel from "./pages/channel/CreateChannel"
import ChannelHome from "./pages/channel/ChannelHome"
import ChannelVideos from "./components/channel/ChannelVideos"
import ChannelPlaylists from "./components/channel/ChannelPlaylists"
import ChannelPosts from "./components/channel/ChannelPosts"
import Search from "./pages/Search"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import Dashboard from "./pages/Dashboard"
import { Toaster } from "sonner"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import RouteLoadingBar from "./components/layout/RouteLoadingBar"
import { ThemeProvider } from "./components/layout/ThemeProvider"

export default function App() {
  return (
    <div className="">
    <ThemeProvider storageKey="vite-ui-theme">
      <RouteLoadingBar/>
      <div className="mb-14">
        <Navbar />
      </div>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pt-6 px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Home />} />
          <Route element={<ProtectedRoutes/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/video/upload" element={<VideoUpload />} />
            <Route path="/channel/create" element={<CreateChannel />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/video/:id" element={<Watch />} />
          <Route path="/channel/:id" element={<ChannelHome />}>
            <Route path="videos" element={<ChannelVideos />} />
            <Route path="playlists" element={<ChannelPlaylists />} />
            <Route path="posts" element={<ChannelPosts />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Toaster/>
    </ThemeProvider>
    </div>
  )
}
