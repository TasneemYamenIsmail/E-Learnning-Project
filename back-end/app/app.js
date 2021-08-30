require('dotenv').config();
require('./db/dbConnection');

const express = require('express');
const cors = require('cors');

const mainRouter = require('../routes/main.routes');
const userRouter = require('../routes/user.routes');
const courseRouter = require('../routes/course.routes');
const quizRouter = require('../routes/quiz.routes');
const questionRouter = require('../routes/question.routes');

const app = express();
app.use(cors());

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(mainRouter);
app.use(userRouter);
app.use(courseRouter);
app.use('/quiz', quizRouter);
app.use('/question', questionRouter);

module.exports = app;