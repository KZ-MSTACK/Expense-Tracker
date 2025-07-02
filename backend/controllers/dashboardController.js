const Income = require('../models/income');
const Expense = require('../models/expense');
const { isValidObjectid , Types } = require ("mongoose");
// @desc Get dashboard summary for a user
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    const incomes = await Income.find({ Userid: userId });
    const expenses = await Expense.find({ Userid: userId });

    const totalIncome = incomes.reduce((acc, item) => acc + item.amount, 0);
    const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);
    const balance = totalIncome - totalExpense;

    const recentIncomes = incomes.slice(-5).reverse();
    const recentExpenses = expenses.slice(-5).reverse();

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance,
      recentIncomes,
      recentExpenses
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to load dashboard data' });
  }
};
