const mongoose = require('mongoose');

let VideoSchema = mongoose.Schema({
  url: [{
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  }],
  uploader: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Video', VideoSchema);
