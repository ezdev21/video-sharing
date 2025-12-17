import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Navbar from "./components/Navbar"
import Watch from "./pages/video/Watch"
import VideoUpload from "./pages/video/VideoUpload"
import CreateChannel from "./pages/channel/CreateChannel"

export default function App() {
  return (
    <>
      <div className="mb-14">
        <Navbar />
      </div>
      <div className="bg-gray-100 min-h-screen pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/channel/create" element={<CreateChannel />} />
          <Route path="/video/upload" element={<VideoUpload />} />
          <Route path="/video/:id" element={<Watch />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}
