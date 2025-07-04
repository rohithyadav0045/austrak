const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/doctors', doctorController.getAllDoctors);
router.post('/doctors', doctorController.createDoctor);
router.put('/doctors/:id', doctorController.updateDoctor);
router.get('/doctors/:id', doctorController.getDoctorById);
router.delete('/doctors/:id', doctorController.deleteDoctor);
router.get('/doctors/counts-by-route', doctorController.getDoctorCountsByRoute);

module.exports = router; 