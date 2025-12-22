import Playlist from "../models/playlist.model.ts";

const playlist_index = (req, res) => {
  Playlist.find().sort({ createdAt: -1 })
    .then(playlists => {
      res.send(playlists);
    })
    .catch(err => {
      res.send('500', { title: 'Error retrieving playlists' });
      console.log(err);
    });
}

const playlist_details = (req, res) => {
  const id = req.params.id;
  Playlist.findById(id)
    .then(playlist => {
      res.send(playlist);
    })
    .catch(err => {
      console.log(err);
      res.send('404', { title: 'Playlist not found' });
    });
}

const playlist_create = (req, res) => {
  const playlist = new Playlist(req.body);
  playlist.save()
    .then(playlist => {
      res.send(playlist);
    })
    .catch(err => {
      console.log(err);
      res.send('500', { title: 'Error creating playlist' });
    });
}

const playlist_delete = (req, res) => {
  const id = req.params.id;
  Playlist.findByIdAndDelete(id)
    .then(playlist => {
      res.send(playlist);
    })
    .catch(err => {
      console.log(err);
      res.send('500', { title: 'Error deleting playlist' });
    });
}

export default {
  playlist_index,
  playlist_details,
  playlist_create,
  playlist_delete
}