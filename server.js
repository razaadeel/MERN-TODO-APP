const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const api = require('./routes/api-routes');
const path = require('path');
const db = require('./config/keys.js').mongoURI;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log(db);
        console.log('connected to the database');
    })
    .catch(err => {
        console.log("DB connection error")
        console.log(err.message);
    })

app.use('/api', api);

//serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('clien/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build, index.html'));
    })
}

app.listen('8080', () => {
    console.log("Server runninng on port 8080");
});