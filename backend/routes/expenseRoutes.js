const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  addExpense,
  getExpenses,
  deleteExpense,
  downloadExcel
} = require('../controllers/expenseController');

router.post('/add-expense', protect, addExpense);
router.get('/get-expenses', protect, getExpenses);
router.delete('/delete-expense/:id', protect, deleteExpense);
router.get('/downloadexcel', protect, downloadExcel);

module.exports = router;
