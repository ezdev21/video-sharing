export interface Video {
  id: number
  title: string
  thumbnail: string
  channel: string
  channelAvatar: string
  views: string
  time: string
  duration: string
  createdAt: string,
  updatedAt: string
}

export interface Playlist {
  id: number;
  title: string;
  videoCount: number;
  createdAt: string,
  updatedAt: string
}

export interface Post {
  id: number;
  channelId: number,
  content: string;
  createdAt: string,
  updatedAt: string
}

export interface Channel{
  id: number;
  name: string;
  avatar: string;
  subscribers: string;
  background: string;
  videos?: Video[];
  playlists?: Playlist[];
  posts?: Post[];
  createdAt: string,
  updatedAt: string
}