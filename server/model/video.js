const mongoose = require('mongoose');

let VideoSchema = mongoose.Schema({
  url: [{
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Video', VideoSchema);
