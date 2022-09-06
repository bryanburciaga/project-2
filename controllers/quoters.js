const express = require('express');
const router = express.Router();
const Product = require('../models/quoter');

// // SEED
// router.get('/seed', (req, res) => {
//     const data = require('./data.json');

//     // first: delete the books collection
//     Product.deleteMany({}, (err, result) => {
//         // second: add new books to the collection
//         Product.insertMany(data, (err, result) => {
//             res.redirect('/');
//         });
//     });
// });

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

// UPDATE

// CREATE
router.post('/quoter', (req, res) => {
    Product.create(req.body, (err, createdProduct) => {
        res.redirect('/quoter')
    });
});

// EDIT 


// // SHOW
// router.get('/:id', (req, res) => {
//     Product.findById(req.params.id, (err, foundProduct) => {
//         res.render('quoters/show.ejs', { product: foundProduct })
//     });
// });

module.exports = router;