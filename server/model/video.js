const mongoose = require('mongoose');

let VideoSchema = mongoose.Schema({
  url: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  type: {
    type: String,
    enum: ['overview', 'practice', 'assignment', 'syllabus', 'exercise', 'question', 'answer'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Video', VideoSchema);
