const express = require('express');
const router = express.Router();
const chemistController = require('../controllers/chemistController');

router.get('/chemists', chemistController.getAllChemists);
router.post('/chemists', chemistController.createChemist);
router.put('/chemists/:id', chemistController.updateChemist);
router.get('/chemists/:id', chemistController.getChemistById);
router.delete('/chemists/:id', chemistController.deleteChemist);
router.get('/chemists/count-per-route', chemistController.getChemistCountPerRoute);
router.put('/chemists/:id/approve', chemistController.approveChemist);
router.put('/chemists/:id/reject', chemistController.rejectChemist);

module.exports = router; 