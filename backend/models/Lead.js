const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Meeting Scheduled', 'Proposal', 'Won', 'Lost'],
    default: 'New'
  },
  value: { type: Number, default: 0 },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', LeadSchema);
