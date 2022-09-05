// dependencies
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/quoter')

// initialize the app
const app = express();

require('dotenv').config();

const PORT = process.env.PORT
const DATABASE_URI = process.env.DATABASE_URI;
const db = mongoose.connection;

app.use(express.static('public'));

// connect to mongodb
mongoose.connect(DATABASE_URI)
// add mongoDB connected and error event listeners
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error,', (err) => console.log('MongoDB Error' + err.message));

// mount middleware

// body parser middleware
app.use(express.urlencoded({ extended: false}));

// Index Routes (for login)


// Homepage Route
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// INDEX
app.get('/quoter', (req, res) => {
    Product.find({}, (err, products) => {
        console.log(products)
    res.render('quoters/index.ejs', {
        'products': products
        });
    });
});

// NEW
app.get('/quoter/new', (req, res) => {
    Product.find({}, (err, products) => {
    //     console.log(products)
    res.render('quoters/new.ejs', {
        'products': products
        });
    });
});

// CREATE
app.post('/quoter', (req, res) => {
    Product.create(req.body, (err, createdProduct) => {
        res.redirect('/quoter')
    });
});

// SHOW
app.get('/quoter/new', (req, res) => {
    res.render('quoters/show.ejs');
})
// tell the app to listen
app.listen(PORT, (req, res) => {
    console.log(`I'm listening on port: ${PORT}`);
});

// SEED
app.get('/seed', (req, res) => {
    const data = require('./data.json');

    // first: delete the books collection
    Product.deleteMany({}, (err, result) => {
        // second: add new books to the collection
        Product.insertMany(data, (err, result) => {
            res.redirect('/');
        });
    });
});
