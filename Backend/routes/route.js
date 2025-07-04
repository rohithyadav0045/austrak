const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');

router.get('/routes', routeController.getAllRoutes);
router.post('/routes', routeController.createRoute);
router.put('/routes/:id', routeController.updateRoute);
router.put('/routes/:id/approve', routeController.approveRoute);
router.get('/routes/employee/:employeeId', routeController.getRoutesByEmployee);

module.exports = router; 