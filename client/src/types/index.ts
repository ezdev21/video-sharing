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