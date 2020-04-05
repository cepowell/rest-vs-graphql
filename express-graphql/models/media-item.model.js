const mongoose = require('mongoose');

const MediaItemSchema = mongoose.Schema({
  title: {type: String, required: true},
  year: String,
  mediaType: {type: String, required: true},
  representationType: {type: String, required: true},
  comments:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  positive: Boolean,
  description: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('MediaItem', MediaItemSchema);
