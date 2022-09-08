// Dependencies
const express = require('express');
const { findOneAndDeLete } = require('../models/quoter');
const router = express.Router();
const Product = require('../models/quoter');


// Home page
router.get('/', (req, res) => {
    res.render('index.ejs');
});

// INDEX
router.get('/quoter', (req, res) => {
    Product.find({}, (err, products) => {
        console.log(products)
    res.render('quoters/index.ejs', {
        'products': products
        });
    });
});

// NEW
router.get('/quoter/new', (req, res) => {
    Product.find({}, (err, products) => {
    //     console.log(products)
    res.render('quoters/new.ejs', {
        'products': products
        });
    });
});

// DELETE
router.delete('/quoter/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
        console.log(deletedProduct)
        res.redirect('/quoter');
    });
});
// UPDATE

// CREATE
router.post('/quoter', (req, res) => {
    Product.create(req.body, (err, createdProduct) => {
        res.redirect('/quoter')
    });
});

// EDIT 


// SHOW
router.get('/quoters/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('quoters/show.ejs', { product: foundProduct })
    });
});

module.exports = router;