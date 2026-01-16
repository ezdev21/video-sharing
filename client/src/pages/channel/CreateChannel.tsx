import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useChannelStore } from "@/store/channel.store";
import { useAuthStore } from "@/store/auth.store";

const CreateChannel: React.FC = () => {
  const navigate = useNavigate();
  const [channelName, setChannelName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [background, setBackground] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const user = useAuthStore(state => state.user);
  const createChannel = useChannelStore(state => state.createChannel);
  
  const channelCreateMutation = useMutation({
      mutationFn: (formData: FormData) => createChannel(formData),
      onSuccess: (channel) => {
        console.log("Channel created successfully:", channel);
        setStatus("Channel created successfully!");
        navigate('/dashboard');
        const id = toast.success("New Channel Created successfully", {
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
        const id = toast.error("Server Error. Channel creation failed", {
          position: "bottom-right",
          richColors: true,
          dismissible: true,
          action: {
            label: "Dismiss",
            onClick: () => toast.dismiss(id),
          },
        });
        console.error("Error creating channel:", error);
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
    if (!avatar || !background || !user) {
      toast.error("User Information, Avatar and background are required",{
        richColors: true,
        position: "bottom-right",
        dismissible: true,
      });
      return;
    }
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("name", channelName);
    formData.append("description", description);
    formData.append("avatar", avatar);
    formData.append("background", background);
    channelCreateMutation.mutate(formData);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Your Channel
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Channel Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Channel Name
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              required
              placeholder="Channel Name"
            />
          </div>

          {/* Description */}
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
              placeholder="Channel Description"
            />
          </div>

          {/* Avatar */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Channel Avatar
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm"
              onChange={handleFileChange(setAvatar)}
              required
            />
          </div>

          {/* Background */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Channel Background
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm"
              onChange={handleFileChange(setBackground)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md  transition"
          >
            Create Channel
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

export default CreateChannel;
