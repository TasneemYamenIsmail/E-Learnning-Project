const Quiz = require('../db/models/quiz.model')
const Question = require('../db/models/question.model')
const response = require('../helpers/response.helper')

const create = async (req,res) => {
    try{
        const question = new Question(req.body);
        // Adding the new question inside quiz ------------------
        const quesId = question._id
        await question.save();
        // Ask Here -----
        const quiz = await Quiz.findOneAndUpdate( { _id: question.quizId },{
            $push: { 
                questions: {
                  "quesId" : quesId
                  }  
              } 
        });
        if(!quiz) res.status(404).send(response(false, null, 'Quiz not found'))
        res.status(200).send(response(true, question, 'Question inserted'))
    }
    catch(e){
        res.status(500).send(response(false, e.message, 'Error'))
    }
}

const displayAll = async (req,res) => {
    try{
        const questions = await Question.find(); 
        res.status(200).send(response(true, questions, 'All questions'))
    }
    catch(e){
        res.status(500).send(response(false, e.message, 'Error'))
    }
}

const displaySingle = async (req,res) => {
    try{
        const id = req.params.id
        const questions = await Question.findById({_id: id}).
        populate({path: "quizId", model: "Quiz", select:"title -_id"})
        if(!questions) return res.status(404).send(response(false, questions, 'Question not found'))
        res.status(200).send(response(true, questions, 'Single questions'))
    }
    catch(e){
        res.status(500).send(response(false, e.message, 'Error'))
    }
}

const displayQuizQuestions = async (req,res) => {
    try{
        const id = req.params.id
        const questions = await Question.find({quizId:id}).
        populate({path: "quizId", model: "Quiz", select:"title -_id"})
        res.status(200).send(response(true, questions , 'All questions'))
    }
    catch(e){
        res.status(500).send(response(false, e.message, 'Error'))
    }
}

const update = async (req,res) => {
    try{
        const id = req.params.id;
        const allowed = ['questionType', 'question', 'answers', 'grade']
        const requested = Object.keys(req.body)
        const isValidUpdates = requested.every(r => allowed.includes(r))
        if(!isValidUpdates) return res.status(404).send(response(false, null, 'You can not update quiz Id'));

        const question = await Question.findByIdAndUpdate(id, req.body, {new:true, runValidators:true})
        
        if(!question) return res.status(404).send(response(false, null, 'Question not found'));
        res.status(200).send(response(true, question, 'Question updated'))
    }
    catch(e){
        res.status(500).send(response(false, e.message, 'Error'))
    }
}

const deleteQues = async (req,res) => {
    try{
        // console.log(req.params.id)
        const quesId = req.params.id
        const question = await Question.findByIdAndDelete({ _id: quesId });
        if(!question) return res.status(404).send(response(false, null, 'Question not found'))

        // I wanna to delete quesId from questions inside quiz collection
        // const quiz = await Quiz
        await Quiz.updateOne( {_id: question.quizId}, { $pull: {"questions":{"quesId":quesId}}  } )
        res.status(200).send(response(true, question, 'question deleted'))
    }
    catch(e){
        res.status(500).send(response(false, e.message, 'Error'))
    }
}

module.exports = { create, displayAll, displaySingle, displayQuizQuestions, update, deleteQues}