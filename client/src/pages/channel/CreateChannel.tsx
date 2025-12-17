import { useState, type ChangeEvent, type FormEvent } from "react";

const CreateChannel: React.FC = () => {
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
    formData.append("channelName", channelName);
    formData.append("description", description);
    formData.append("avatar", avatar);
    formData.append("background", background);

    try {
      const res = await fetch("http://localhost:5000/channel/create", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Channel creation failed");

      setStatus("Channel created successfully!");
      setChannelName("");
      setDescription("");
      setAvatar(null);
      setBackground(null);
    } catch {
      setStatus("Error creating channel.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
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
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
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
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition"
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
