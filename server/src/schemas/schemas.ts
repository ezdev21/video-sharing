import { z } from "zod";

// User schema
export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password: z.string(),
});

// Video schema
export const VideoSchema = z.object({
  id: z.number(),
  title: z.string(),
  thumbnail: z.string(),
  channel: z.string(),
  channelAvatar: z.string(),
  views: z.number(),
  time: z.string(),
  duration: z.string(),
});

// Channel schema
export const ChannelSchema = z.object({
  id: z.number(),
  name: z.string(),
  avatar: z.string(),
  subscribers: z.string(),
});

// Playlist schema
export const PlaylistSchema = z.object({
  id: z.number(),
  title: z.string(),
  videoCount: z.number(),
});

// Post schema
export const PostSchema = z.object({
  id: z.number(),
  content: z.string(),
  date: z.string(),
});

// Comment schema
export const CommentSchema = z.object({
  id: z.number(),
  videoId: z.number(),
  userId: z.number(),
  content: z.string(),
  date: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type Video = z.infer<typeof VideoSchema>;
export type Channel = z.infer<typeof ChannelSchema>;
export type Playlist = z.infer<typeof PlaylistSchema>;
export type Post = z.infer<typeof PostSchema>;
export type Comment = z.infer<typeof CommentSchema>;
