const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');

app.use('/',bodyParser.json());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

//Import Routes
const queriesRoute = require('./routes/queries');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const cartRoute = require('./routes/cart');

app.use('/queries',queriesRoute);
app.use('/login',loginRoute);
app.use('/register',registerRoute);
app.use('/cart',cartRoute);

//ROUTES
app.get('/', (req,res) => {
    res.send("We are on home");
});

//Connect to DataBase
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true,useUnifiedTopology: true },() => {
    console.log('connected to DB')
});

//How to start listening to server
app.listen(3000);