const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  content: {type: String, required: true},
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);
