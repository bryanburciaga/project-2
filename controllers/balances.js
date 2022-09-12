
// Dependencies
const express = require('express');
const { get } = require('mongoose');
const { findOneAndDeLete } = require('../models/quoter');
const router = express.Router();
const Sale = require('../models/sale');
const Expense = require('../models/expense');
// const Balance = require('../models/balance');

// INDEX
router.get('/balance', async (req, res) => {
    const sales = await Sale.find({});

    const totals = sales.map(sale => {
        const total = sale.price * sale.qty;
        return total;
    });
    const expenses = await Expense.find({});

    const expenseTotals = expenses.map(expense => {
        const expenseTotal = expense.price * expense.qty;
        return expenseTotal;
    });

    const grandTotal = totals.reduce((partialSum, a) => partialSum + a, 0);
const grandExpenseTotal = expenseTotals.reduce((partialSum, a) => partialSum + a, 0);
    res.render('balances/index.ejs', {
        total: grandTotal,
        itemsCount: totals.length,
        expenseTotal: grandExpenseTotal
    });
});
module.exports = router;
