const DayPlan = require('../models/DayPlan');
const Route = require('../models/Route');
const Employee = require('../models/Employee');
const Hierarchy = require('../models/Hierarchy');

// Submit or update Day Plan
exports.submitDayPlan = async (req, res) => {
  try {
    const { employee, date, route, isDiverted, divertedRoute, jointWorkWith, workingType } = req.body;
    let status = 'Approved';
    let finalRoute = route;
    if (isDiverted) {
      status = 'Pending';
      finalRoute = divertedRoute;
    }
    // Upsert: one day plan per employee per date
    const dayPlan = await DayPlan.findOneAndUpdate(
      { employee, date: new Date(date) },
      {
        employee,
        date: new Date(date),
        route: finalRoute,
        isDiverted: !!isDiverted,
        divertedRoute: isDiverted ? divertedRoute : undefined,
        status,
        jointWorkWith,
        workingType,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(dayPlan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Day Plan for employee/date
exports.getDayPlan = async (req, res) => {
  try {
    const { employee, date } = req.query;
    const plan = await DayPlan.findOne({ employee, date: new Date(date) })
      .populate('employee route divertedRoute jointWorkWith approvedBy rejectedBy');
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all pending Day Plans for approval (for managers)
exports.getPendingDayPlans = async (req, res) => {
  try {
    const { approverId } = req.query;
    // Find employees under this approver in hierarchy
    const hierarchies = await Hierarchy.find({});
    const subordinates = hierarchies
      .filter(h => h.manager && h.manager.toString() === approverId)
      .map(h => h.employee);
    const plans = await DayPlan.find({ employee: { $in: subordinates }, status: 'Pending' })
      .populate('employee route divertedRoute jointWorkWith');
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve a diverted Day Plan
exports.approveDayPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { approverId } = req.body;
    const plan = await DayPlan.findByIdAndUpdate(
      id,
      { status: 'Approved', approvedBy: approverId, approvedAt: new Date(), rejectedBy: null, rejectedAt: null, rejectionReason: null },
      { new: true }
    );
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reject a diverted Day Plan
exports.rejectDayPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { approverId, reason } = req.body;
    const plan = await DayPlan.findByIdAndUpdate(
      id,
      { status: 'Rejected', rejectedBy: approverId, rejectedAt: new Date(), rejectionReason: reason },
      { new: true }
    );
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all approved routes for an employee
exports.getApprovedRoutes = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const routes = await Route.find({ employee: employeeId, approved: true });
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 