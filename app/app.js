require('dotenv').config();
require('./db/dbConnection');

const express = require('express');
const mainRouter = require('../routes/main.routes');
const userRouter = require('../routes/user.routes');

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(mainRouter);
app.use(userRouter);

module.exports = app