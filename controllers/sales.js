// DEPENDENCIES
const express = require('express');
const { findOneAndDelete } = require('../models/sale');
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
        res.redirect('/sales/' + req.params.id);
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
router.get('/sales/:id', (req, res) => {
    Sale.findById(req.params.id, (err, foundSale) => {
        res.render('sales/show.ejs', { sale: foundSale })
    });
});




module.exports = router;