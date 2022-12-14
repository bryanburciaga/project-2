
// Dependencies
const express = require('express');
const { get } = require('mongoose');
const { findOneAndDeLete } = require('../models/quoter');
const router = express.Router();
const Product = require('../models/quoter');
const Sale = require('../models/sale');


// Home page
router.get('/', async (req, res) => {
    res.render('index.ejs', {
    });
});

// INDEX
router.get('/quoter', async (req, res) => {
    const products = await Product.find({});

    const totals = products.map(products => {
        const total = products.price * products.qty;
        return total;
    });

    const taxes = products.map(products => {
        const taxes = ((products.price * products.qty) * .16);
        return taxes;
    });
    
    const grandTaxes = taxes.reduce((partialSum, a) => partialSum + a, 0);
    const grandTotal = totals.reduce((partialSum, a) => partialSum + a, 0);
    res.render('quoters/index.ejs', {
        'products': products,
        'total': grandTotal,
        'taxes': grandTaxes
        });
    });


// NEW
router.get('/quoter/new', (req, res) => {
    res.render('quoters/new.ejs');
});


// DELETE
router.delete('/quoter/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
        console.log(deletedProduct)
        res.redirect('/quoter');
    });
});
// UPDATE
router.put('/quoter/:id', (req, res) => {
    Product.findOneAndUpdate(req.params.id, req.body, (err, oldProduct) => {
        res.redirect('/quoter/' + req.params.id); 
        });
    });


// CREATE
router.post(('/quoter'), (req, res) => {
    Product.create(req.body, (err, createdProduct) => {
     res.redirect('/quoter');
    });    
 });

// EDIT 
router.get('/quoter/:id/edit', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('quoters/edit.ejs', {
            product: foundProduct
        });
    });
});

// SHOW
router.get('/quoter/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('quoters/show.ejs', { product: foundProduct })
    });
});

module.exports = router;
