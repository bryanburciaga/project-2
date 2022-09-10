const express = require('express');
const { findOneAndDelete } = require('../models/stock');
const { get } = require('mongoose');
const router = express.Router();
const Sale = require('../models/sale')
const Stock = require('../models/stock');
const stock = require('../models/stock');

// Index
router.get('/stock', (req, res) => {
    Stock.find({}, (err, stocks) => {
        res.render('stocks/index.ejs', {
            'stocks': stocks
        });
    });
});

// // New
// router.get('/stock/new', (req, res) => {
//     res.render('stocks/new.ejs');
// })

// Create
router.post(('/stock'), (req, res) => {
    Stock.create(req.body, (err, createdStock) => {
        res.render('/stocks');
    });
});

module.exports = router;