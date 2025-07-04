const express = require('express');
const router = express.Router();
const hierarchyController = require('../controllers/hierarchyController');

router.get('/hierarchies', hierarchyController.getHierarchies);
router.put('/hierarchies/:headQtr', hierarchyController.updateHierarchy);

module.exports = router; 