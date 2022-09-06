const express = require('express');
const router = express.Router();
const Sale = require('../models/quoter');

// INDEX
router.get('/sales', (req, res) => {

    // Book.find({}, (err, books) => {
        res.render('sales/index.ejs');
            // 'books': books 
     
    });
// });

module.exports = router;