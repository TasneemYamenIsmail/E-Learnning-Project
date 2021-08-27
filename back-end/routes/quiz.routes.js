const Quiz = require('../app/db/models/quiz.model')
const Question = require('../app/db/models/question.model')
const response = require('../app/helpers/response.helper')
const router = require('express').Router();

// ==>for full quiz
// /quiz/create 
// /quiz/update/:id
// /quiz/delete/:id
// /quiz/getAll

// Create new quiz ----------------------------------
router.post('/create', async (req,res) => {
    try{
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(200).send(response(true, quiz, 'Data inserted'))
    }
    catch(e){
        res.status(500).send(response(false, e.message, 'Error'))
    }
})
// --------------------------------------------------


// Display all Quizzes ---------------------------------
router.get('/all', async (req,res) => {
    try{
        const quizzes = await Quiz.find()
        // .populate({ path: 'questions.quesId' , model: "Question" }); 
        res.status(200).send(response(true, quizzes, 'All quizzes'))
    }
    catch(e){
        res.status(500).send(response(false, e.message, 'Error'))
    }
})
// -----------------------------------------------------


// Update quiz -----------------------------------------
router.get('/single/:id', async (req,res) => {
    try{
        const id = req.params.id
        const quiz = await Quiz.findById({_id: id}).populate({
            path: 'questions.quesId' , model: "Question"
          });
        if(!quiz) return res.status(404).send(response(false, null, 'Quiz not found'))
        res.status(200).send(response(true, quiz, 'Single quiz'))
    }
    catch(e){
        res.status(500).send(response(false, e.message, 'Error'))
    }
})
router.patch('/update/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const allowed = ['startDate', 'dueDate', 'status', 'valid', 'totalGrade'] // must add questions
        const requested = Object.keys(req.body)
        const isValidUpdates = requested.every(r => allowed.includes(r))

        if(!isValidUpdates) return res.status(404).send(response(false, null, 'You can not update title and courseid'));
        const quiz = await Quiz.findByIdAndUpdate(id, req.body, {new:true, runValidators:true})
        // {new:true, } => if new data insert data 
        if(!quiz) return res.status(404).send(response(false, null, 'Quiz not found'));
        res.status(200).send(response(true, quiz, 'Quiz updated'))
    }
    catch(e){
        res.status(500).send(response(false, e.message, 'Error'))
    }
})
// -----------------------------------------------------


// Delete quiz -----------------------------------------
router.delete('/delete/:id', async (req,res) => {
    try{
        // console.log(req.params.id)
        const id = req.params.id
        // Delete all Questions related to this quiz ----------
        await Question.deleteMany({quizId: id})

        const quiz = await Quiz.findByIdAndDelete({ _id: id });
        if(!quiz) return res.status(404).send(response(false, null, 'Quiz not found'))
        res.status(200).send(response(true, quiz, 'Quiz deleted'))
    }
    catch(e){
        res.status(500).send(response(false, e.message, 'Error'))
    }
})
// -----------------------------------------------------

module.exports = router