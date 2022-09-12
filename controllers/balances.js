
// Dependencies
const express = require('express');
const { get } = require('mongoose');
const { findOneAndDeLete } = require('../models/quoter');
const router = express.Router();
const Sale = require('../models/sale');
const Expense = require('../models/expense')
// const Balance = require('../models/balance');

// INDEX
router.get('/balance', async (req, res) => {
    const sales = await Sale.find({});

    const totals = sales.map(sale => {
        const total = sale.price * sale.qty;
        return total;
    });

    const grandTotal = totals.reduce((partialSum, a) => partialSum + a, 0);

    res.render('balances/index.ejs', {
        total: grandTotal,
        itemsCount: totals.length
    });
});
module.exports = router;
