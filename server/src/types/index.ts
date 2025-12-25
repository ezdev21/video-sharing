export interface Video {
  id: number
  title: string
  thumbnail: string
  channel: string
  channelAvatar: string
  views: number,
  time: string
  duration: string
}

export interface Playlist {
  id: number;
  title: string;
  videoCount: number;
}

export interface Post {
  id: number;
  content: string;
  date: string;
}

export interface Channel{
  id: number;
  name: string;
  avatar: string;
  subscribers: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Comment {
  id: number;
  videoId: number;
  userId: number;
  content: string;
  date: string;
}