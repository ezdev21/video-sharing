import mongoose from "mongoose";

const Schema = mongoose.Schema;

const channelSchema = new Schema({
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

const Channel = mongoose.model('Channel', channelSchema);
export default Channel;