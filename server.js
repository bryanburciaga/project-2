const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
PORT = process.env.PORT
// const DATABASE_URI = process.env.DATABASE_URI;

const app = express();

app.use(express.static('public'));

// Homepage Route
app.get('/quoter', (req, res) => {
    res.render('index.ejs');
});
// mongoose.connect(DATABASE_URI)

// const db = mongoose.connecting;

// db.on('connected to', () => console.log('Connected to MongoDB'));
// db.on('error,', (err) => console.log('MongoDB Error'));


app.listen(PORT, (req, res) => {
    console.log(`I'm listening on port: ${PORT}`);
});