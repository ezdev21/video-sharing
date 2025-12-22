import Post from "../models/post.model.ts";

const post_index = (req, res) => {
  Post.find().sort({ createdAt: -1 })
    .then(posts => {
      res.send(posts);
    })
    .catch(err => {
      res.send('500', { title: 'Error retrieving posts' });
      console.log(err);
    });
}

const post_details = (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then(post => {
      res.send(post);
    })
    .catch(err => {
      console.log(err);
      res.send('404', { title: 'Post not found' });
    });
}

const post_create = (req, res) => {
  const post = new Post(req.body);
  post.save()
    .then(post => {
      res.send(post);
    })
    .catch(err => {
      console.log(err);
      res.send('500', { title: 'Error creating post' });
    });
}

const post_delete = (req, res) => {
  const id = req.params.id;
  Post.findByIdAndDelete(id)
    .then(post => {
      res.send(post);
    })
    .catch(err => {
      console.log(err);
      res.send('500', { title: 'Error deleting post' });
    });
}

export default {
  post_index,
  post_details,
  post_create,
  post_delete
}