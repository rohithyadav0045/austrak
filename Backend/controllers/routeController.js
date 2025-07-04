const Route = require('../models/Route');

// Get all routes (admin view)
exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find().populate('employee');
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new route
exports.createRoute = async (req, res) => {
  try {
    const route = new Route(req.body);
    await route.save();
    res.status(201).json(route);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a route
exports.updateRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!route) return res.status(404).json({ error: 'Route not found' });
    res.json(route);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Approve a route
exports.approveRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
    if (!route) return res.status(404).json({ error: 'Route not found' });
    res.json(route);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get routes by employee (for self-view)
exports.getRoutesByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const routes = await Route.find({ employee: employeeId }).populate('employee');
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 