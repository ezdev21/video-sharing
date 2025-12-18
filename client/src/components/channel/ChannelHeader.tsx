
interface ChannelHeaderProps {
  name: string;
  avatar: string;
  subscribers: string;
}

export default function ChannelHeader({ name, avatar, subscribers }: ChannelHeaderProps) {
  return (
      <div className="flex items-center gap-4 p-4">
        <img src={avatar} className="w-16 h-16 rounded-full" alt={name} />
        <div>
          <h1 className="text-xl font-bold">{name}</h1>
          <p className="text-sm text-gray-500">{subscribers} subscribers</p>
        </div>
      </div>
  )
}
