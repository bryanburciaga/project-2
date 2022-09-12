// DEPENDENCIES
const express = require('express');
const { findOneAndDelete } = require('../models/sale');
const router = express.Router();
const Sale = require('../models/sale');
const stock = require('../models/stock');
const Stock = require('../models/stock');

// INDEX
router.get('/sales', async (req, res) => {
    const sales = await Sale.find({});

    const totals = sales.map(sale => {
        const total = sale.price * sale.qty;
        return total;
    });
    const stocks = await Stock.find({});

    const stockTotals = stocks.map(stock => {
        const stockTotal = stock.qty;
        return stockTotal;
    });
    
    const grandStockTotal = stockTotals.reduce((partialSum, a) => partialSum + a, 0);
    const grandTotal = totals.reduce((partialSum, a) => partialSum + a, 0);
    res.render('sales/index.ejs', { 
        total: grandTotal,
        sales: sales,
        stockTotal: grandStockTotal
    });
     });


// NEW
router.get('/sales/new', (req, res) => {
    res.render('sales/new.ejs');
});

// DELETE
router.delete('/sales/:id', (req, res) => {
Sale.findByIdAndDelete(req.params.id, (err, deletedSale) => {
        console.log(deletedSale);
    res.redirect('/sales');
    });
});

// UPDATE
router.put('/sales/:id', (req,res) => {
    Sale.findOneAndUpdate(req.params.id, req.body, (err, oldSaleVersion) => {
        res.redirect('/sales/');
    });
});

// CREATE
router.post(('/sales'), (req, res) => {
   Sale.create(req.body, (err, createdSale) => {
    res.redirect('/sales');
   });    
});

// EDIT 
router.get('/sales/:id/edit', (req, res) => {
    Sale.findById(req.params.id, (err, foundSale) => {
        res.render('sales/edit.ejs', {
            sale: foundSale
        });
    });
});

// SHOW
// router.get('/sales/:id', (req, res) => {
//     Sale.findById(req.params.id, (err, foundSale) => {
//         res.render('sales/show.ejs', { sale: foundSale })
//     });
// });




module.exports = router;