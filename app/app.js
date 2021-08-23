require('dotenv').config();
require('./db/dbConnection');

const express = require('express');
const mainRouter = require('../routes/main.routes');

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(mainRouter);

module.exports = app