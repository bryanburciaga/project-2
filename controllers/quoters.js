
// Dependencies
const express = require('express');
const { findOneAndDeLete } = require('../models/quoter');
const router = express.Router();
const Product = require('../models/quoter');
const Sale = require('../models/sale');


// Home page
router.get('/', async (req, res) => {
    const sales = await Sale.find({});

    const totals = sales.map(sale => {
        const total = sale.price * sale.qty;
        return total;
    });

    const grandTotal = totals.reduce((partialSum, a) => partialSum + a, 0);

    res.render('index.ejs',{
        total: grandTotal,
        itemsCount: totals.length
    });
});

// INDEX
router.get('/quoter', async (req, res) => {
    const products = await Product.find({});

    const totals = products.map(products => {
        const total = products.price * products.qty;
        return total;
    });

    const grandTotal = totals.reduce((partialSum, a) => partialSum + a, 0);
    res.render('quoters/index.ejs', {
        'products': products,
        'total': grandTotal
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
router.get('/quoter', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('quoters/edit.ejs');
    });
});

// SHOW
router.get('/quoters/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('quoters/show.ejs', { product: foundProduct })
    });
});

module.exports = router;
