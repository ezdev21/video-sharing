import express from 'express';
import cors from 'cors';
import videoRoute from './routes/video.route.js';
import channelRoute from './routes/channel.route.js';
import playlistRoute from './routes/playlist.route.js';
import commentRoute from './routes/comment.route.js';
import postRoute from './routes/post.route.js';
import userRoute from './routes/user.route.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  // origin: 'http://localhost:5173', // Match your frontend's address
  origin: process.env.APP_ENV == 'developement' ? '*' : process.env.ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
};

app.use(cors(corsOptions));

app.get('/', (_req, res) => {
  res.send('ViParta! the video sharing website!');
});

app.use('/user', userRoute);
app.use('/video', videoRoute);
app.use('/channel', channelRoute);
app.use('/playlist', playlistRoute);
app.use('/comment', commentRoute);
app.use('/post', postRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
