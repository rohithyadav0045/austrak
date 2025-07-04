const Hierarchy = require('../models/Hierarchy');
const Employee = require('../models/Employee');

// Get all hierarchies with employee details populated
exports.getHierarchies = async (req, res) => {
  try {
    const hierarchies = await Hierarchy.find().populate({
      path: 'allocations.TBE/BM allocations.ASO allocations.ASM allocations.RM allocations.SR.RM allocations.ZM allocations.SR.ZM allocations.SM allocations.NSM allocations.MD allocations.ADMIN',
      select: 'employeeName employeeCode',
    });
    res.json(hierarchies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update allocation for a staff type in a headQtr
exports.updateHierarchy = async (req, res) => {
  try {
    const { headQtr } = req.params;
    const { staffType, employeeId } = req.body;
    if (!staffType || !employeeId) {
      return res.status(400).json({ error: 'staffType and employeeId are required' });
    }
    const hierarchy = await Hierarchy.findOneAndUpdate(
      { headQtr },
      { $set: { [`allocations.${staffType}`]: employeeId } },
      { new: true, upsert: true }
    ).populate({
      path: `allocations.${staffType}`,
      select: 'employeeName employeeCode',
    });
    res.json(hierarchy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 