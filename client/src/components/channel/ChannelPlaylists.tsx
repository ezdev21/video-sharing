import type { Playlist } from "@/types";

const playlists: Playlist[] = [
  { id: 1, title: "React Tutorials", videoCount: 12 },
  { id: 2, title: "TypeScript Guides", videoCount: 8 },
];

export default function ChannelPlaylists() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {playlists.map(pl => (
        <div key={pl.id} className="border p-4 rounded">
          <h3 className="font-medium">{pl.title}</h3>
          <p className="text-sm text-gray-500">{pl.videoCount} videos</p>
        </div>
      ))}
    </div>
  )
}
