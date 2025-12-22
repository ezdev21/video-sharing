import Comment from "../models/comment.model.ts";

const comment_index = (req, res) => {
  Comment.find().sort({ createdAt: -1 })
    .then(comments => {
      res.send(comments);
    })
    .catch(err => {
      res.send('500', { title: 'Error retrieving comments' });
      console.log(err);
    });
}

const comment_details = (req, res) => {
  const id = req.params.id;
  Comment.findById(id)
    .then(comment => {
      res.send(comment);
    })
    .catch(err => {
      console.log(err);
      res.send('404', { title: 'Comment not found' });
    });
}

const comment_create = (req, res) => {
  const comment = new Comment(req.body);
  comment.save()
    .then(comment => {
      res.send(comment);
    })
    .catch(err => {
      console.log(err);
      res.send('500', { title: 'Error creating comment' });
    });
}

const comment_delete = (req, res) => {
  const id = req.params.id;
  Comment.findByIdAndDelete(id)
    .then(comment => {
      res.send(comment);
    })
    .catch(err => {
      console.log(err);
      res.send('500', { title: 'Error deleting comment' });
    });
}

export default {
  comment_index,
  comment_details,
  comment_create,
  comment_delete
}