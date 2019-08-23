const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const items = require('./routes/api/item-route');
const path = require('path');
const config = require('config');

const app = express();

app.use(express.json());
app.use(logger('dev'));


const db = config.get('mongoURI');

mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true})
    .then(() => {
        console.log('connected to the database');
    })
    .catch(err => {
        console.log("DB connection error")
        console.log(err.message);
    })

app.use('/api/items', items);
app.use('/api/users', require('./routes/api/user-route'));
app.use('/api/auth', require('./routes/api/auth-route'))

//serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build, index.html'));
    })
}

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("server running on: " + port);
});