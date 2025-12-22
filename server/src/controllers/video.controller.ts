import Video from "../models/video.model.ts";

const video_index = (req, res) => {
  return "Hello from video controller";
  Video.find().sort({ createdAt: -1 })
    .then(videos => {
      res.send(videos);
    })
    .catch(err => {
      res.send('500', { title: 'Error retrieving videos' });
      console.log(err);
    });
}

const video_details = (req, res) => {
  const id = req.params.id;
  Video.findById(id)
    .then(video => {
      res.send(video);
    })
    .catch(err => {
      console.log(err);
      res.send('404', { title: 'Video not found' });
    });
}

const video_create = (req, res) => {
  const video = new Video(req.body);
  video.save()
    .then(video => {
      res.send(video);
    })
    .catch(err => {
      console.log(err);
      res.send('500', { title: 'Error creating video' });
    });
}

const video_delete = (req, res) => {
  const id = req.params.id;
  Video.findByIdAndDelete(id)
    .then(video => {
      res.send(video);
    })
    .catch(err => {
      console.log(err);
      res.send('500', { title: 'Error deleting video' });
    });
}

const videoController = {
  video_index,
  video_details,
  video_create,
  video_delete
}

export default videoController;