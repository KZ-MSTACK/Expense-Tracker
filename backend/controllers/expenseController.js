const Expense = require('../models/expense');
const ExcelJS = require('exceljs');

// @desc Add a new expense
exports.addExpense = async (req, res) => {
  try {
    const { amount, Icon, Category, date } = req.body;

    if (!amount || !Icon || !Category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Amount must be a positive number' });
    }

    const expense = new Expense({
      Userid: req.user._id, // assuming 'protect' middleware sets this
      amount,
      Icon,
      Category,
      date: date || Date.now(),
    });

    await expense.save();

    res.status(201).json({
      message: 'Expense added successfully',
      expense,
    });
  } catch (error) {
    console.error('Add expense error:', error);
    res.status(500).json({ error: 'Server error while adding expense' });
  }
};

// @desc Get all expenses for a user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ Userid: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ error: 'Server error while fetching expenses' });
  }
};

// @desc Delete an expense by ID
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Expense.findOneAndDelete({ _id: id, Userid: req.user._id });

    if (!deleted) {
      return res.status(404).json({ error: 'Expense not found or unauthorized' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({ error: 'Server error while deleting expense' });
  }
};

// @desc Download expenses as Excel
exports.downloadExcel = async (req, res) => {
  try {
    const expenses = await Expense.find({ Userid: req.user._id });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Expenses');

    worksheet.columns = [
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Icon', key: 'Icon', width: 15 },
      { header: 'Category', key: 'Category', width: 25 },
      { header: 'Date', key: 'date', width: 20 },
    ];

    expenses.forEach(expense => {
      worksheet.addRow({
        amount: expense.amount,
        Icon: expense.Icon,
        Category: expense.Category,
        date: expense.date.toDateString(),
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=expenses.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Download Excel error:', error);
    res.status(500).json({ error: 'Failed to generate Excel file' });
  }
};
