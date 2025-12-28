import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";

const CreateChannel: React.FC = () => {
  const navigate = useNavigate();
  const [channelName, setChannelName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [background, setBackground] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleFileChange =
    (setter: (file: File | null) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setter(e.target.files[0]);
      }
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!avatar || !background) {
      setStatus("Please upload both avatar and background images.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", 1);
    formData.append("name", channelName);
    formData.append("description", description);
    formData.append("avatar", avatar);
    formData.append("background", background);

    api.post("/channel", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      setStatus("Channel created successfully!");
      navigate('/dashboard');
    })
    .catch((err) => {
      throw new Error("Channel creation failed");
    });
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
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-hover transition"
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
