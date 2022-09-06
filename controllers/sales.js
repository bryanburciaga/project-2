const express = require('express');
const router = express.Router();
const Sale = require('../models/quoter');

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
    res.send(createdSale);
   });    
});


module.exports = router;