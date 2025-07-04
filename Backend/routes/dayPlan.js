const express = require('express');
const router = express.Router();
const dayPlanController = require('../controllers/dayPlanController');

// Submit or update Day Plan
router.post('/', dayPlanController.submitDayPlan);

// Get Day Plan for employee/date
router.get('/', dayPlanController.getDayPlan);

// Get all pending Day Plans for approval
router.get('/pending', dayPlanController.getPendingDayPlans);

// Approve a diverted Day Plan
router.put('/:id/approve', dayPlanController.approveDayPlan);

// Reject a diverted Day Plan
router.put('/:id/reject', dayPlanController.rejectDayPlan);

// Get all approved routes for an employee
router.get('/approved-routes/:employeeId', dayPlanController.getApprovedRoutes);

module.exports = router; 