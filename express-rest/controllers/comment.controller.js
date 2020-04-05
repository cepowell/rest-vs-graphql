const Comment = require('../models/comment.model');
const MediaItem = require('../models/media-item.model');

exports.create = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: "Comment cannot be empty."
    });
  }

  const comment = new Comment({
    content: req.body.content,
  });

  comment
    .save()
    .then(() => {
      return MediaItem.findById(req.params.mediaItemId);
    })
    .then(item => {
      if (!item) {
        return res.status(404).send({
          message: "Entry not found with ID " + req.params.mediaItemId
        });
      }
      item.comments.push(comment);
      item.save();
      item.populate('comments');
      res.send(item);
    })
    .catch(err => {
      res.status(500).send(
        {
          message: err.message || "Unknown error occurred adding the entry."
        }
      );
    });
}

exports.findAll = (req, res) => {
  MediaItem
    .findById(req.params.mediaItemId)
    .populate('comments')
    .then(item => {
      if (!item) {
        return res.status(404).send({
          message: "Entry not found with ID " + req.params.mediaItemId
        });
      }
      res.send(item.comments);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Unknown error occurred finding entries."
      });
    });
}


exports.findOne = (req, res) => {
  Comment
    .findById(req.params.commentId)
    .then(comment => {
      if (!comment) {
        return res.status(404).send({
          message: "Entry not found with ID " + req.params.commentId
        });
      }
      res.send(comment)
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Entry not found with ID " + req.params.itemId
        });
      }
      return res.status(500).send({
        message: "Error retrieving entry with ID " + req.params.itemId
      });
    });
}

exports.delete = (req, res) => {
  Comment
    .findByIdAndRemove(req.params.commentId)
    .then(item => {
      if (!item) {
        return res.status(404).send({
          message: "Entry not found with ID " + req.params.commentId
        });
      }
      const mediaItem = MediaItem.findById(req.params.mediaItemId);
      res.send(mediaItem);
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Entry not found with ID " + req.params.commentId
        });
      }
      return res.status(500).send({
        message: "Error deleting entry with ID " + req.params.commentId
      });
    });
}

exports.update = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: "Invalid content."
    });
  }

  Comment
    .findByIdAndUpdate(req.params.commentId, {
      content: req.body.content,
    }, {
      new: true
    })
    .then(item => {
      if (!item) {
        return res.status(404).send({
          message: "Entry not found with ID " + req.params.commentId
        });
      }
      res.send(item);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Entry not found with ID " + req.params.itemId
        });
      }
      return res.status(500).send({
        message: "Error updating entry with ID " + req.params.itemId
      });
    });
}
