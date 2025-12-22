import Channel from "../models/channel.model.ts";

const channel_index = (req, res) => {
  Channel.find().sort({ createdAt: -1 })
    .then(channels => {
      res.send(channels);
    })
    .catch(err => {
      res.send('500', { title: 'Error retrieving channels' });
      console.log(err);
    });
}

const channel_details = (req, res) => {
  const id = req.params.id;
  Channel.findById(id)
    .then(channel => {
      res.send(channel);
    })
    .catch(err => {
      console.log(err);
      res.send('404', { title: 'Channel not found' });
    });
}

const channel_create = (req, res) => {
  const channel = new Channel(req.body);
  channel.save()
    .then(channel => {
      res.send(channel);
    })
    .catch(err => {
      console.log(err);
      res.send('500', { title: 'Error creating channel' });
    });
}

const channel_delete = (req, res) => {
  const id = req.params.id;
  Channel.findByIdAndDelete(id)
    .then(channel => {
      res.send(channel);
    })
    .catch(err => {
      console.log(err);
      res.send('500', { title: 'Error deleting channel' });
    });
}

export default {
  channel_index,
  channel_details,
  channel_create,
  channel_delete
}