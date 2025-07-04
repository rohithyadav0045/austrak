const TourProgramme = require('../models/TourProgramme');
const Employee = require('../models/Employee');
const Doctor = require('../models/Doctor');
const Chemist = require('../models/Chemist');
const Stockist = require('../models/Stockist');
const { isInHierarchy } = require('../lib/hierarchyUtils');

// Get tour programme by employee, month, year
exports.getTourProgramme = async (req, res) => {
  try {
    const { employeeId, month, year } = req.query;
    const tour = await TourProgramme.findOne({ employee: employeeId, month, year })
      .populate('employee')
      .populate('days.route1')
      .populate('days.route2')
      .populate('days.route3')
      .populate('days.jointWorkWith');
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Submit or update tour programme with deadline enforcement
exports.submitOrUpdateTourProgramme = async (req, res) => {
  try {
    const { employee, month, year, days } = req.body;
    const emp = await Employee.findById(employee);
    if (!emp) return res.status(404).json({ error: 'Employee not found' });
    const staffType = emp.staffType;
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // JS months are 0-based
    // Only allow submission for next month
    if (!(year === currentYear && month === currentMonth + 1) && !(currentMonth === 12 && year === currentYear + 1 && month === 1)) {
      return res.status(400).json({ error: 'Can only submit tour programme for next month' });
    }
    let deadlineDay = 29;
    if (staffType === 'TBE/BM' || staffType === 'ASO') deadlineDay = 25;
    else if (staffType === 'ASM' || staffType === 'RM') deadlineDay = 27;
    // Submission deadline is in the previous month
    let deadlineMonth = currentMonth;
    let deadlineYear = currentYear;
    if (currentMonth === 12) {
      deadlineMonth = 12;
      deadlineYear = currentYear;
    }
    const deadline = new Date(deadlineYear, deadlineMonth - 1, deadlineDay, 23, 59, 59);
    if (now > deadline) {
      return res.status(400).json({ error: `Submission deadline for your role (${staffType}) is ${deadlineDay}th of previous month.` });
    }
    let tour = await TourProgramme.findOne({ employee, month, year });
    if (tour) {
      tour.days = days;
      await tour.save();
    } else {
      tour = await TourProgramme.create({ employee, month, year, days });
    }
    res.status(200).json(tour);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Approve a day in tour programme with hierarchy check
exports.approveDay = async (req, res) => {
  try {
    const { id, dayIndex } = req.params;
    const { approverId } = req.body;
    const tour = await TourProgramme.findById(id);
    if (!tour) return res.status(404).json({ error: 'TourProgramme not found' });
    const empId = tour.employee;
    if (!await isInHierarchy(approverId, empId)) {
      return res.status(403).json({ error: 'Not authorized to approve this tour programme' });
    }
    tour.days[dayIndex].status = 'approved';
    tour.days[dayIndex].approvedBy = approverId;
    tour.days[dayIndex].approvedAt = new Date();
    await tour.save();
    res.json(tour);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Reject a day in tour programme with hierarchy check
exports.rejectDay = async (req, res) => {
  try {
    const { id, dayIndex } = req.params;
    const { approverId } = req.body;
    const tour = await TourProgramme.findById(id);
    if (!tour) return res.status(404).json({ error: 'TourProgramme not found' });
    const empId = tour.employee;
    if (!await isInHierarchy(approverId, empId)) {
      return res.status(403).json({ error: 'Not authorized to reject this tour programme' });
    }
    tour.days[dayIndex].status = 'rejected';
    tour.days[dayIndex].approvedBy = approverId;
    tour.days[dayIndex].approvedAt = new Date();
    await tour.save();
    res.json(tour);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get present employees for joint work (excluding self)
exports.getPresentEmployees = async (req, res) => {
  try {
    const { excludeId } = req.query;
    const employees = await Employee.find({ present: true, _id: { $ne: excludeId } });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get counts for a route (Dr, Chem, STK)
exports.getCountsForRoute = async (req, res) => {
  try {
    const { routeId } = req.query;
    const drCount = await Doctor.countDocuments({ route: routeId, approved: true });
    const chemCount = await Chemist.countDocuments({ route: routeId, approved: true });
    const stkCount = await Stockist.countDocuments({ route: routeId, approved: true });
    res.json({ dr: drCount, chem: chemCount, stk: stkCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 