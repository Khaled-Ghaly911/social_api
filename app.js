const path = require('path')

const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const { Result } = require('express-validator');



const app = express();

app.use(bodyParser.json());

app.use('images/', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    next();
});


app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message: message
    });
})

mongoose.connect('mongodb+srv://khaledghaly000:eH0xSez5dM09Ar2I@cluster0.s5xgw.mongodb.net/messages?retryWrites=true&w=majority&appName=Cluster0')
    .then(result => {
        app.listen(8080);
    }).catch(err => console.log(err))