const controller = require('../app/controllers/quiz.controller')
const auth = require('../app/middleware/auth');
const teacherStudentAuth = require('../app/middleware/teacherStudentAuth');
const router = require('express').Router();


// Create new quiz -------------------------------------
router.post('/create', controller.create)
// -----------------------------------------------------

// Display all Quizzes ---------------------------------
router.get('/all', controller.displayAll)
// -----------------------------------------------------

// Update quiz -----------------------------------------
router.get('/single/:id', controller.displaySingle)
router.patch('/update/:id', controller.update)
// -----------------------------------------------------

// Delete quiz -----------------------------------------
router.delete('/delete/:id', controller.deleteQuiz)
// -----------------------------------------------------

module.exports = router