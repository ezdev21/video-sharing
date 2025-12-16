import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ChannelCreate from "./pages/channel/Create"
import VideoCreate from "./pages/video/Create"
import NotFound from "./pages/NotFound"
import Navbar from "./components/Navbar"

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/channel/create" element={<ChannelCreate />} />
        <Route path="/video/create" element={<VideoCreate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
