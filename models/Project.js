const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    default: 'Proposed', 
    enum: ['Proposed', 'Approved', 'In Progress', 'Completed', 'Rejected'] 
  },
  deadline: { type: Date, required: true },
  attachmentUrl: { type: String, default: '' },
  comments: [commentSchema]
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);