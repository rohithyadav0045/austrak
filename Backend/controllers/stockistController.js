const Stockist = require('../models/Stockist');

// Get all stockists
exports.getAllStockists = async (req, res) => {
  try {
    const stockists = await Stockist.find().populate('route').populate('employee');
    res.json(stockists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new stockist
exports.createStockist = async (req, res) => {
  try {
    const stockist = new Stockist(req.body);
    await stockist.save();
    res.status(201).json(stockist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a stockist
exports.updateStockist = async (req, res) => {
  try {
    const stockist = await Stockist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stockist) return res.status(404).json({ error: 'Stockist not found' });
    res.json(stockist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get stockist by ID
exports.getStockistById = async (req, res) => {
  try {
    const stockist = await Stockist.findById(req.params.id).populate('route').populate('employee');
    if (!stockist) return res.status(404).json({ error: 'Stockist not found' });
    res.json(stockist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a stockist
exports.deleteStockist = async (req, res) => {
  try {
    const stockist = await Stockist.findByIdAndDelete(req.params.id);
    if (!stockist) return res.status(404).json({ error: 'Stockist not found' });
    res.json({ message: 'Stockist deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Aggregation: Count approved stockists per route
exports.getStockistCountPerRoute = async (req, res) => {
  try {
    const counts = await Stockist.aggregate([
      { $match: { approved: true } },
      { $group: { _id: '$route', count: { $sum: 1 } } },
    ]);
    res.json(counts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve a stockist
exports.approveStockist = async (req, res) => {
  try {
    const stockist = await Stockist.findByIdAndUpdate(
      req.params.id,
      { approved: true, rejectedRemark: '' },
      { new: true }
    );
    if (!stockist) return res.status(404).json({ error: 'Stockist not found' });
    res.json(stockist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Reject a stockist
exports.rejectStockist = async (req, res) => {
  try {
    const { rejectedRemark } = req.body;
    const stockist = await Stockist.findByIdAndUpdate(
      req.params.id,
      { approved: false, rejectedRemark },
      { new: true }
    );
    if (!stockist) return res.status(404).json({ error: 'Stockist not found' });
    res.json(stockist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 