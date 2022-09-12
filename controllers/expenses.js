const express = require('express');
const { findOneAndDelete } = require('../models/expense');
const { get } = require('mongoose');
const router = express.Router();
const Expense = require('../models/expense');



// Index
router.get('/expense', (req, res) => {
    Expense.find({}, (err, expenses) => {
        res.render('expenses/index.ejs', {
            'expenses': expenses
        });
    });
});

// // New
// router.get('/expense/new', (req, res) => {
//     res.render('expenses/new.ejs');
// })

// Delete
router.delete('/expense/:id', (req, res) => {
    Expense.findByIdAndDelete(req.params.id, (err, deletedExpense) => {
            console.log(deletedExpense);
        res.redirect('/expense');
        });
    });
    
 
// Update
router.put('/expense/:id', (req, res) => {
    Expense.findOneAndUpdate(req.params.id, req.body, (err, oldExpenseVersion) => {
        res.redirect('/expense');
    });
});

// Create
router.post('/expense', (req, res) => {
    Expense.create(req.body, (err, createdExpense) => {
        res.redirect('/expense');
    });
});

// Edit
router.get('/expense/:id/edit', (req, res) => {
    Expense.findById(req.params.id, (err, foundExpense) => {
        res.render('expense/edit.ejs', {
            expense: foundExpense
        });
    });
});

module.exports = router;