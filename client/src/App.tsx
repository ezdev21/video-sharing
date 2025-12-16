import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ChannelCreate from "./pages/channel/Create"
import VideoCreate from "./pages/video/Create"
import NotFound from "./pages/NotFound"
import Navbar from "./components/Navbar"
import Watch from "./pages/video/Watch"

export default function App() {
  return (
    <>
      <div className="mb-20">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/channel/create" element={<ChannelCreate />} />
        <Route path="/video/create" element={<VideoCreate />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
