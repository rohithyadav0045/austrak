const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');

// Create user (assign username/password to employee)
exports.createUser = async (req, res) => {
  try {
    const { employee, username, password, role } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ employee, username, passwordHash, role });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('employee');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user (reset password, activate/deactivate)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, active, role } = req.body;
    const update = {};
    if (password) update.passwordHash = await bcrypt.hash(password, 10);
    if (active !== undefined) update.active = active;
    if (role) update.role = role;
    const user = await User.findByIdAndUpdate(id, update, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 