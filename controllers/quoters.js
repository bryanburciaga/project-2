const express = require('express');
const router = express.Router();




// INDUCES

// INDEX
router.get('/quoter', (req, res) => {
    res.render('quoter/index.ejs');
});