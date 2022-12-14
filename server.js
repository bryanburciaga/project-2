// dependencies
const express = require('express');
const mongoose = require('mongoose');
const productsRouter = require('./controllers/quoters');
const salesRouter = require('./controllers/sales');
const stocksRouter = require('./controllers/stocks');
const expensesRouter = require('./controllers/expenses');
const balancesRouter = require('./controllers/balances');
// initialize the app
const app = express();
const methodOverride = require('method-override');

require('dotenv').config();

const PORT = process.env.PORT
const DATABASE_URI = process.env.DATABASE_URI;
const db = mongoose.connection;

app.use(express.static('public'));
// app.set('view engine', 'ejs');
// connect to mongodb
mongoose.connect(DATABASE_URI)
// add mongoDB connected and error event listeners
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error,', (err) => console.log('MongoDB Error' + err.message));

// mount middleware

// body parser middleware
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));
app.use(productsRouter);
app.use(stocksRouter);
app.use(salesRouter);
app.use(expensesRouter);
app.use(balancesRouter);
// const salesControllers = require('./controllers/sales');
// app.use('/sales', salesControllers);


// tell the app to listen
app.listen(PORT, (req, res) => {
    console.log(`I'm listening on port: ${PORT}`);
});

