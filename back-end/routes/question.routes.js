const controller = require('../app/controllers/question.controller')
const auth = require('../app/middleware/auth');
const teacherStudentAuth = require('../app/middleware/teacherStudentAuth');
const router = require('express').Router(); 
 
// { create, displayAll, displaySingle, displayQuizQuestions, update , deleteQues}
// Create new question ----------------------------------
router.post('/create', controller.create )
// --------------------------------------------------

// Display all Questions ----------------------------
router.get('/all', controller.displayAll)
// --------------------------------------------------

// Get single question ------------------------------
router.get('/single/:id',controller.displaySingle )
// Update question ----------------------------------
router.patch('/update/:id', controller.update )
// --------------------------------------------------


// Display all questions for single quiz ------------
// How can i display quiz data?
router.get('/singlequiz/:id', controller.displayQuizQuestions )
// --------------------------------------------------

// Delete question -----------------------------------------
router.delete('/delete/:id', controller.deleteQues)
// -----------------------------------------------------

module.exports = router