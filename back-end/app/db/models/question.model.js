const mongoose = require('mongoose')
const validator = require("validator")
const Quiz = require('./quiz.model')

//    _id,
//    quizId,
//    type, //? how to manipultae MCQ?
//    qTitle,
//    qAnswer, ->array
//    grade

const questionSchema = new mongoose.Schema({
    quizId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Quiz",
        required:true
    },
    questionType:{
        type:String,
        required:true,
        enum:['ESSAY','MCQ'],
        trim:true
    },
    question:{
        type: String,
        required: true
    },
    answers:[{
        answer:{
            title:{
                type: String,
                required: true
            }
        }
    }],
    rightAnswer: {
        type: String,
        default: "",
        required: function(){ return this.questionType == "MCQ" }
    },
    grade:{
        type: Number,
        required: true
    }
}, {timestamps: true});

// questionSchema.virtual('quesQuiz', {
//     ref:'Quiz',
//     localField:"quizId",
//     foreignField:"_id"
// })


const Question = mongoose.model('Question', questionSchema);
module.exports = Question;