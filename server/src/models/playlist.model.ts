import mongoose from "mongoose";

const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;