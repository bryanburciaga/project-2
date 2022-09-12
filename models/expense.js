const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema ({
    product: {type: String, required: true },
    price: {type: Number, required: true },
    qty: {type: Number, required: true},
}, {timestamps: true});

module.exports = mongoose.model('Expense', ExpenseSchema);