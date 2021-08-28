const Quiz = require('../db/models/quiz.model')
const Question = require('../db/models/question.model')
const Course = require('../db/models/course.model')
const response = require('../helpers/response.helper')


const create =  async (req,res) => {
    try{
        const quiz = new Quiz(req.body);
        await quiz.save();
        
        const course = await Course.findOneAndUpdate( { _id: quiz.courseId },{
            $push: {
                quizzes: {
                  "quizId" : quiz._id
                  }  
              } 
        });
        if(!course) res.status(404).send(response(false, null, 'Course not found'))
        res.status(200).send(response(true, quiz, 'Data inserted'))
    }
    catch(e){
        res.status(500).send(response(false, e.message, 'Error'))
    }
};

const displayAll = async (req,res) => {
    try{
        const quizzes = await Quiz.find()
        // .populate({ path: 'questions.quesId' , model: "Question" }); 
        res.status(200).send(response(true, quizzes, 'All quizzes'))
    }
    catch(e){
        res.status(500).send(response(false, e.message, 'Error'))
    }
}

const displaySingle =  async (req,res) => {
    try{
        const id = req.params.id
        const quiz = await Quiz.findById({_id: id})
            .populate({ path: 'questions.quesId' , model: "Question", select:"question" })
            .populate({ path: 'courseId' , model: "Course" , select:"name totalHours"});
            
        if(!quiz) return res.status(404).send(response(false, null, 'Quiz not found'))
        res.status(200).send(response(true, quiz, 'Single quiz'))
    }
    catch(e){
        res.status(500).send(response(false, e.message, 'Error'))
    }
}

const update = async (req,res) => {
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
}

const deleteQuiz = async (req,res) => {
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
}

module.exports = { create, displayAll, displaySingle, update , deleteQuiz}