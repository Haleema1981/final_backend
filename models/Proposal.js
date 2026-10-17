const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  studentName: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Proposed', 'Approved', 'In Progress', 'Completed', 'Rejected'], 
    default: 'Proposed' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Proposal', proposalSchema);