import express from 'express';
import cors from 'cors';
import videoRoute from './routes/video.route.ts';
import channelRoute from './routes/channel.route.ts';
import playlistRoute from './routes/playlist.route.ts';
import commentRoute from './routes/comment.route.ts';
import postRoute from './routes/post.route.ts';

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:5173', // Match your frontend's address
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
};

app.use(cors(corsOptions));

app.get('/', (_req, res) => {
  res.send('ViParta! the video sharing website!');
});

app.use('/video', videoRoute);
app.use('/channel', channelRoute);
app.use('/playlist', playlistRoute);
app.use('/comment', commentRoute);
app.use('/post', postRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
