const express = require('express');
const router = express.Router();
const Sale = require('../models/sale');

// INDEX
router.get('/sales', (req, res) => {
    Sale.find({}, (err, sales) => {
        res.render('sales/index.ejs', {
            'sales': sales
    });
});
});
// NEW

router.get('/sales/new', (req, res) => {
    res.render('sales/new.ejs');
});

// CREATE
router.post(('/sales'), (req, res) => {
   Sale.create(req.body, (err, createdSale) => {
    res.redirect('/sales');
   });    
});

// SHOW
router.get('/sales/:id', (req, res) => {
    Sale.findById(req.params.id, (err, foundSale) => {
        res.render('sales/show.ejs', { sale: foundSale })
    });
});




module.exports = router;