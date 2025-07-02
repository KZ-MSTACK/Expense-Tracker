const Income = require('../models/income');
const ExcelJS = require('exceljs');

// @desc Add new income
exports.addIncome = async (req, res) => {
  try {
    const { amount, Icon, Source, date } = req.body;

    if (!amount || !Icon || !Source) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Amount must be a positive number' });
    }

    const newIncome = new Income({
      Userid: req.user._id, // assuming protect middleware attaches user
      amount,
      Icon,
      Source,
      date: date || Date.now(),
    });

    await newIncome.save();

    res.status(201).json({
      message: 'Income added successfully',
      income: newIncome,
    });
  } catch (error) {
    console.error('Add income error:', error);
    res.status(500).json({ error: 'Server error while adding income' });
  }
};

// @desc Get all incomes for a user
exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ Userid: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    console.error('Get incomes error:', error);
    res.status(500).json({ error: 'Server error while fetching incomes' });
  }
};

// @desc Delete income by ID
exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    const income = await Income.findOneAndDelete({ _id: id, Userid: req.user._id });

    if (!income) {
      return res.status(404).json({ error: 'Income not found or unauthorized' });
    }

    res.status(200).json({ message: 'Income deleted successfully' });
  } catch (error) {
    console.error('Delete income error:', error);
    res.status(500).json({ error: 'Server error while deleting income' });
  }
};

// @desc Download income data as Excel file
exports.downloadexcel = async (req, res) => {
  try {
    const incomes = await Income.find({ Userid: req.user._id });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Incomes');

    worksheet.columns = [
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Icon', key: 'Icon', width: 15 },
      { header: 'Source', key: 'Source', width: 25 },
      { header: 'Date', key: 'date', width: 20 },
    ];

    incomes.forEach(income => {
      worksheet.addRow({
        amount: income.amount,
        Icon: income.Icon,
        Source: income.Source,
        date: income.date.toDateString(),
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=incomes.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Excel download error:', error);
    res.status(500).json({ error: 'Failed to generate Excel file' });
  }
};
