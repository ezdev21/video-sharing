import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:5173', // Match your frontend's address
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
};

app.use(cors(corsOptions));

app.get('/', (_req, res) => {
  res.send('Video sharing website!');
});

app.get('/videos', (_req, res) => {
  const videos = [
  {
    id: 1,
    title: "Build a YouTube Clone with React & Tailwind",
    thumbnail: "https://picsum.photos/400/225?random=1",
    channel: "Code Academy",
    channelAvatar: "https://i.pravatar.cc/150?img=1",
    views: "1.2M",
    time: "2 days ago",
    duration: "12:45",
  },
  {
    id: 2,
    title: "JavaScript Interview Questions You Must Know",
    thumbnail: "https://picsum.photos/400/225?random=2",
    channel: "JS Mastery",
    channelAvatar: "https://i.pravatar.cc/150?img=2",
    views: "850K",
    time: "1 week ago",
    duration: "18:30",
  },
  {
    id: 3,
    title: "React Router v6 Complete Guide",
    thumbnail: "https://picsum.photos/400/225?random=3",
    channel: "Frontend Simplified",
    channelAvatar: "https://i.pravatar.cc/150?img=3",
    views: "640K",
    time: "3 weeks ago",
    duration: "25:10",
  },
  {
    id: 4,
    title: "Tailwind CSS in 20 Minutes",
    thumbnail: "https://picsum.photos/400/225?random=4",
    channel: "DesignCourse",
    channelAvatar: "https://i.pravatar.cc/150?img=4",
    views: "1.8M",
    time: "1 month ago",
    duration: "20:00",
  },
  {
    id: 5,
    title: "Build a YouTube Clone with React & Tailwind",
    thumbnail: "https://picsum.photos/400/225?random=1",
    channel: "Code Academy",
    channelAvatar: "https://i.pravatar.cc/150?img=1",
    views: "1.2M",
    time: "2 days ago",
    duration: "12:45",
  },
  {
    id: 6,
    title: "JavaScript Interview Questions You Must Know",
    thumbnail: "https://picsum.photos/400/225?random=2",
    channel: "JS Mastery",
    channelAvatar: "https://i.pravatar.cc/150?img=2",
    views: "850K",
    time: "1 week ago",
    duration: "18:30",
  },
  {
    id: 7,
    title: "React Router v6 Complete Guide",
    thumbnail: "https://picsum.photos/400/225?random=3",
    channel: "Frontend Simplified",
    channelAvatar: "https://i.pravatar.cc/150?img=3",
    views: "640K",
    time: "3 weeks ago",
    duration: "25:10",
  },
  {
    id: 8,
    title: "Tailwind CSS in 20 Minutes",
    thumbnail: "https://picsum.photos/400/225?random=4",
    channel: "DesignCourse",
    channelAvatar: "https://i.pravatar.cc/150?img=4",
    views: "1.8M",
    time: "1 month ago",
    duration: "20:00",
  },
  {
    id: 9,
    title: "Build a YouTube Clone with React & Tailwind",
    thumbnail: "https://picsum.photos/400/225?random=1",
    channel: "Code Academy",
    channelAvatar: "https://i.pravatar.cc/150?img=1",
    views: "1.2M",
    time: "2 days ago",
    duration: "12:45",
  },
  {
    id: 10,
    title: "JavaScript Interview Questions You Must Know",
    thumbnail: "https://picsum.photos/400/225?random=2",
    channel: "JS Mastery",
    channelAvatar: "https://i.pravatar.cc/150?img=2",
    views: "850K",
    time: "1 week ago",
    duration: "18:30",
  },
  {
    id: 11,
    title: "React Router v6 Complete Guide",
    thumbnail: "https://picsum.photos/400/225?random=3",
    channel: "Frontend Simplified",
    channelAvatar: "https://i.pravatar.cc/150?img=3",
    views: "640K",
    time: "3 weeks ago",
    duration: "25:10",
  },
  {
    id: 12,
    title: "Tailwind CSS in 20 Minutes",
    thumbnail: "https://picsum.photos/400/225?random=4",
    channel: "DesignCourse",
    channelAvatar: "https://i.pravatar.cc/150?img=4",
    views: "1.8M",
    time: "1 month ago",
    duration: "20:00",
  },
];
  res.send(videos);
});

app.get('/video/:id', (_req, res) => {
  const video = {
    id: 1,
    title: "Build a YouTube Clone with React & Tailwind",
    thumbnail: "",
    channel: "Code Academy",
    channelAvatar: "https://i.pravatar.cc/150?img=1",
    views: "1.2M",
    time: "2 days ago",
    duration: "12:45",
  }
  res.send(video);
});

app.get('/video/:id/recommended', (_req, res) => {
  const recommended = [
  {
    id: 2,
    title: "React Router v6 Full Course",
    thumbnail: "https://picsum.photos/200/120?random=10",
    channel: "JS Mastery",
    channelAvatar: "",
    views: "900K",
    time: "1 week ago",
    duration: "18:30",
  },
  {
    id: 3,
    title: "Tailwind CSS Crash Course",
    thumbnail: "https://picsum.photos/200/120?random=11",
    channel: "DesignCourse",
    channelAvatar: "",
    views: "1.1M",
    time: "2 weeks ago",
    duration: "22:10",
  },
  {
    id: 4,
    title: "React Router v6 Full Course",
    thumbnail: "https://picsum.photos/200/120?random=10",
    channel: "JS Mastery",
    channelAvatar: "",
    views: "900K",
    time: "1 week ago",
    duration: "18:30",
  },
  {
    id: 5,
    title: "Tailwind CSS Crash Course",
    thumbnail: "https://picsum.photos/200/120?random=11",
    channel: "DesignCourse",
    channelAvatar: "",
    views: "1.1M",
    time: "2 weeks ago",
    duration: "22:10",
  },
]
  res.send(recommended);
});

app.get('/video/:id/comments', (_req, res) => {
  const comments = [
    {
      id: 1,
      user: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=10",
      text: "This video is amazing",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=11",
      text: "Helped me a lot, thanks!",
      time: "1 day ago",
    },
  ];
  res.send(comments);
});

app.post('/video/comments/add', (_req, res) => { 
  const comment = {
    id:  1,
    user: "Anonymous",
    avatar: "https://i.pravatar.cc/150?img=12", // placeholder avatar
    text: "Hello",
    time: "Just now",
  };
  res.send(comment);
});

app.post('/video/upload', (_req, res) => {
  res.send('Video sharing website!');
});

app.get('/channel/:id', (_req, res) => {
  const channel = {
    id: 1,
    name: "My Channel",
    avatar: "https://i.pravatar.cc/150?img=5",
    subscribers: "1.2M",
  };
  res.send(channel);
}); 

app.post('/channel/create', (_req, res) => {
  res.send('Video sharing website!');
});

app.get('/channel/:id/videos', (_req, res) => {
  const channelVideos = [
    { id: 1, title: "React Tutorial", thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg", views: "1.2M views", date: "2 days ago" },
    { id: 2, title: "TypeScript Basics", thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg", views: "500K views", date: "1 week ago" },
  ];
  res.send(channelVideos);
});

app.get('/channel/:id/playlists', (_req, res) => {
   const channelPlaylists = [
    { id: 1, title: "React Tutorials", videoCount: 12 },
    { id: 2, title: "TypeScript Guides", videoCount: 8 },
  ];
  res.send(channelPlaylists);
});

app.get('/channel/:id/posts', (_req, res) => {
  const channelPosts = [
    { id: 1, content: "Just uploaded a new React tutorial!", date: "1 day ago" },
    { id: 2, content: "Learning TypeScript is fun!", date: "3 days ago" },
  ];
  res.send(channelPosts);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
