const mongoose = require('mongoose')
const validator = require("validator")
const Question = require('./question.model')

const quizSchema = new mongoose.Schema({
    // courseId,
    title:{
        type: String,
        min: 10,
        required: true
    },
    startDate:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isAfter(value)) throw new Error('Date must be after today')
        }
    },
    dueDate:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isAfter(value,this.startDate)) throw new Error('Date must be after start date')
        }
    },
    status:{ // true if submitted, false if not submitted,
        type: Boolean, 
        default: false 
    },  
    valid:{ // true if before due date, false after due date,
        type: Boolean, 
        default: false
    },
    questions:[{
        quesId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref:"Question" 
        }
    }],
    totalGrade:{
        type: Number,
        required: true
    }
}, {timestamps: true});

quizSchema.virtual('quizQuestions', {
    ref:'Question',
    localField:"questions._id",
    foreignField:"_id"
})

// quizSchema.pre('remove', async function(next) { 
//     const quiz = this
//     res.send(quiz)
//     return
//     await Question.deleteMany({quizId: quiz._id})
//     next()
// });


const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;