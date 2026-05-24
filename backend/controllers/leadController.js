const Lead = require('../models/Lead');

// Get all leads
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new lead
exports.createLead = async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a lead (especially for Kanban drag & drop status change)
exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    req.body.updatedAt = Date.now();
    const updatedLead = await Lead.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedLead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a lead
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    await Lead.findByIdAndDelete(id);
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
