const express = require('express');
const router = express.Router();

// Import controller functions (replace with your actual controller)
const {
  addIncome,
  getIncomes,
  deleteIncome
} = require('../controllers/incomeController');

// Routes
router.post('/add-income',protect, addIncome);         // Route to add a new income
router.get('/get-incomes',protect, getIncomes);        // Route to get all incomes
router.delete('/downloadexcel/',protect,downloadexcel ); // Route to download excelsheet of incomes
router.delete('/delete-income/:id', deleteIncome); // Route to delete an income by ID

module.exports = router;
