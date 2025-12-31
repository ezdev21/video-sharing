export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface Video {
  id: string
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
  id: string;
  title: string;
  videoCount: number;
  createdAt: string,
  updatedAt: string
}

export interface Post {
  id: string;
  channelId: number,
  content: string;
  createdAt: string,
  updatedAt: string
}

export interface Channel{
  id: string;
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