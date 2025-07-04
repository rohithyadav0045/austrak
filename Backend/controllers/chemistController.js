const Chemist = require('../models/Chemist');

// Get all chemists
exports.getAllChemists = async (req, res) => {
  try {
    const chemists = await Chemist.find().populate('route').populate('employee');
    res.json(chemists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new chemist
exports.createChemist = async (req, res) => {
  try {
    const chemist = new Chemist(req.body);
    await chemist.save();
    res.status(201).json(chemist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a chemist
exports.updateChemist = async (req, res) => {
  try {
    const chemist = await Chemist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!chemist) return res.status(404).json({ error: 'Chemist not found' });
    res.json(chemist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get chemist by ID
exports.getChemistById = async (req, res) => {
  try {
    const chemist = await Chemist.findById(req.params.id).populate('route').populate('employee');
    if (!chemist) return res.status(404).json({ error: 'Chemist not found' });
    res.json(chemist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a chemist
exports.deleteChemist = async (req, res) => {
  try {
    const chemist = await Chemist.findByIdAndDelete(req.params.id);
    if (!chemist) return res.status(404).json({ error: 'Chemist not found' });
    res.json({ message: 'Chemist deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Aggregation: Count approved chemists per route
exports.getChemistCountPerRoute = async (req, res) => {
  try {
    const counts = await Chemist.aggregate([
      { $match: { approved: true } },
      { $group: { _id: '$route', count: { $sum: 1 } } },
    ]);
    res.json(counts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve a chemist
exports.approveChemist = async (req, res) => {
  try {
    const chemist = await Chemist.findByIdAndUpdate(
      req.params.id,
      { approved: true, rejectedRemark: '' },
      { new: true }
    );
    if (!chemist) return res.status(404).json({ error: 'Chemist not found' });
    res.json(chemist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Reject a chemist
exports.rejectChemist = async (req, res) => {
  try {
    const { rejectedRemark } = req.body;
    const chemist = await Chemist.findByIdAndUpdate(
      req.params.id,
      { approved: false, rejectedRemark },
      { new: true }
    );
    if (!chemist) return res.status(404).json({ error: 'Chemist not found' });
    res.json(chemist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 