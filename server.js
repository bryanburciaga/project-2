const express = require('express');
const mongoose = require('mongoose');


// initialize the app
const app = express();

require('dotenv').config();

PORT = process.env.PORT
const DATABASE_URI = process.env.DATABASE_URI;
const db = mongoose.connection;

app.use(express.static('public'));


mongoose.connect(DATABASE_URI)

db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error,', (err) => console.log('MongoDB Error' + err.message));


app.listen(PORT, (req, res) => {
    console.log(`I'm listening on port: ${PORT}`);
});

// Homepage Route
app.get('/quoter', (req, res) => {
    res.render('index.ejs');
});