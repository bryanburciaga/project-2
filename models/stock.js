const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema ({
    product: {type: String, },
    price: {type: Number, },
    qty: {type: Number, },
}, {timestamps: true});

module.exports = mongoose.model('Stock', StockSchema);