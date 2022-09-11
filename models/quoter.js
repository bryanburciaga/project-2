const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    product: {type: String, required: true},
    price: {type: Number, required: true},
    qty: {type: Number, required: true},
    date: {type: Date, default: Date.now},
}, {timestamps: true});

module.exports = mongoose.model('Product', ProductSchema);