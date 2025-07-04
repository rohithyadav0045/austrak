const express = require('express');
const router = express.Router();
const expenseMasterController = require('../controllers/expenseMasterController');

router.get('/expense-masters', expenseMasterController.getAllExpenseMasters);
router.get('/expense-masters/:id', expenseMasterController.getExpenseMasterById);
router.post('/expense-masters', expenseMasterController.createExpenseMaster);
router.put('/expense-masters/:id', expenseMasterController.updateExpenseMaster);
router.delete('/expense-masters/:id', expenseMasterController.deleteExpenseMaster);

module.exports = router; 