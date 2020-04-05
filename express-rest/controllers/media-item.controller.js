const MediaItem = require('../models/media-item.model');

exports.create = (req, res) => {
  if (!req.body.title || !req.body.mediaType || !req.body.representationType) {
    return res.status(400).send({
      message: "Please provide a title, the media type, and the representation type."
    });
  }

  const mediaItem = new MediaItem({
    title: req.body.title,
    year: req.body.year,
    mediaType: req.body.mediaType,
    representationType: req.body.representationType,
    positive: req.body.positive,
    description: req.body.description,
  });

  mediaItem
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Unknown error occurred adding the entry."
      });
    });
};

exports.findAll = (req, res) => {
  MediaItem
    .find()
    .populate('comments')
    .then(items => {
      res.send(items);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Unknown error occurred finding entries."
      });
    });
};

exports.findOne = (req, res) => {
  MediaItem
    .findById(req.params.itemId)
    .populate('comments')
    .then(item => {
      if (!item) {
        return res.status(404).send({
          message: "Entry not found with ID " + req.params.itemId
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
        message: "Error retrieving entry with ID " + req.params.itemId
      });
    });
};

exports.delete = (req, res) => {
  MediaItem
    .findByIdAndRemove(req.params.itemId)
    .then(item => {
      if (!item) {
        return res.status(404).send({
          message: "Entry not found with ID " + req.params.itemId
        });
      }
      res.send({
        message: "Entry deleted successfully."
      });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Entry not found with ID " + req.params.itemId
        });
      }
      return res.status(500).send({
        message: "Error deleting entry with ID " + req.params.itemId
      });
    });
};

exports.update = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: "Invalid content."
    });
  }

  MediaItem.findByIdAndUpdate(req.params.itemId, {
      title: req.body.title,
      year: req.body.year,
      mediaType: req.body.mediaType,
      representationType: req.body.representationType,
      positive: req.body.positive,
      description: req.body.description,
    }, {
      new: true
    })
    .then(item => {
      if (!item) {
        return res.status(404).send({
          message: "Entry not found with ID " + req.params.itemId
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
};
