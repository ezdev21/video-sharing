import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useVideoStore } from "@/store/video.store";
import { useChannelStore } from "@/store/channel.store";
import { useAuthStore } from "@/store/auth.store";

const VideoUpload: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const uploadVideo = useVideoStore(state => state.uploadVideo);
  const user = useAuthStore(state => state.user);
  const channel = useChannelStore(state => state.channel);
  
  const uploadVideoMutation = useMutation({
      mutationFn: (formData: FormData) => uploadVideo(formData),
      onSuccess: (video) => {
        console.log("Video uploaded successfully:", video);
        setStatus("Video uploaded successfully!");
        navigate('/dashboard');
        const id = toast.success("New Video Uploaded successfully", {
          position: "bottom-right",
          richColors: true,
          dismissible: true,
          duration: 5000,
          action: {
            label: "Dismiss",
            onClick: () => toast.dismiss(id),
          },
        });
      },
      onError: (error) => {
        const id = toast.error("Server Error. Video Upload failed", {
          position: "bottom-right",
          richColors: true,
          dismissible: true,
          action: {
            label: "Dismiss",
            onClick: () => toast.dismiss(id),
          },
        });
        console.error("Error uploading video:", error);
      }
    });

  const handleFileChange =
    (setter: (file: File | null) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setter(e.target.files[0]);
      }
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!thumbnail || !video || !user || !channel) {
      setStatus("Please select both thumbnail and video files.");
      return;
    }
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("channelId", channel.id);
    formData.append("title", title);
    formData.append("thumbnail", thumbnail);
    formData.append("video", video);
    formData.append("description", description);
    uploadVideoMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Upload New Video
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Video Title
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Video Title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Thumbnail Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm"
              onChange={handleFileChange(setThumbnail)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Video File
            </label>
            <input
              type="file"
              accept="video/*"
              className="w-full text-sm"
              onChange={handleFileChange(setVideo)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Video Description"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md  transition"
          >
            Upload Video
          </button>
        </form>

        {status && (
          <p className="text-center mt-4 text-sm font-medium text-gray-700">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
