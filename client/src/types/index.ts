export interface Video {
  id: number
  title: string
  thumbnail: string
  channel: string
  channelAvatar: string
  views: string
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
  background: string;
  videos?: Video[];
  playlists?: Playlist[];
  posts?: Post[];
}