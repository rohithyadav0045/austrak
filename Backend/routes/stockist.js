const express = require('express');
const router = express.Router();
const stockistController = require('../controllers/stockistController');

router.get('/stockists', stockistController.getAllStockists);
router.post('/stockists', stockistController.createStockist);
router.put('/stockists/:id', stockistController.updateStockist);
router.get('/stockists/:id', stockistController.getStockistById);
router.delete('/stockists/:id', stockistController.deleteStockist);
router.get('/stockists/count-per-route', stockistController.getStockistCountPerRoute);
router.put('/stockists/:id/approve', stockistController.approveStockist);
router.put('/stockists/:id/reject', stockistController.rejectStockist);

module.exports = router; 