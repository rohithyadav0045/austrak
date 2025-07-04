const ExpenseMaster = require('../models/ExpenseMaster');

// Get all expense master entries
exports.getAllExpenseMasters = async (req, res) => {
  try {
    const entries = await ExpenseMaster.find().populate('employee');
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get expense master entry by ID
exports.getExpenseMasterById = async (req, res) => {
  try {
    const entry = await ExpenseMaster.findById(req.params.id).populate('employee');
    if (!entry) return res.status(404).json({ error: 'ExpenseMaster not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new expense master entry
exports.createExpenseMaster = async (req, res) => {
  try {
    const entry = new ExpenseMaster(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an expense master entry (push previous to history)
exports.updateExpenseMaster = async (req, res) => {
  try {
    const entry = await ExpenseMaster.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: 'ExpenseMaster not found' });
    // Push current state to history
    entry.history.push({
      daType: entry.daType,
      effectFrom: entry.effectFrom,
      daLocal: entry.daLocal,
      daEx: entry.daEx,
      daOs: entry.daOs,
      fareRates: entry.fareRates,
      entryType: entry.entryType,
      headQtr: entry.headQtr,
      state: entry.state,
      staffType: entry.staffType,
      designation: entry.designation,
      updatedAt: new Date(),
    });
    // Update fields
    Object.assign(entry, req.body);
    await entry.save();
    res.json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an expense master entry
exports.deleteExpenseMaster = async (req, res) => {
  try {
    const entry = await ExpenseMaster.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ error: 'ExpenseMaster not found' });
    res.json({ message: 'ExpenseMaster deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 