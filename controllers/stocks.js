const express = require('express');
const { findOneAndDelete } = require('../models/stock');
const { get } = require('mongoose');
const router = express.Router();
const Sale = require('../models/sale')
const Stock = require('../models/stock');


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

// Delete
router.delete('/stock/:id', (req, res) => {
    Stock.findByIdAndDelete(req.params.id, (err, deletedStock) => {
            console.log(deletedStock);
        res.redirect('/stock');
        });
    });
    
 
// Update
router.put('/stock/:id', (req, res) => {
    Stock.findOneAndUpdate(req.params.id, req.body, (err, oldStockVersion) => {
        res.redirect('/stock/');
    });
});

// Create
router.post('/stock', (req, res) => {
    Stock.create(req.body, (err, createdStock) => {
        res.redirect('/stock');
    });
});

// Edit
router.get('/stock/:id/edit', (req, res) => {
    Stock.findById(req.params.id, (err, foundStock) => {
        res.render('stocks/edit.ejs', {
            stock: foundStock
        });
    });
});

module.exports = router;