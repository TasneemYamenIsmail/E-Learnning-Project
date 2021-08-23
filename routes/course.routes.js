const router = require('express').Router()
const courseController = require('../app/controllers/course.controller')

router.post('/create',courseController.create)
router.get('/getAll',courseController.getAll)
router.get('/getAll/:id',courseController.getSingleCourse)
router.delete('/delete/:id',courseController.deleteCourse)
router.patch('/edit/:id', courseController.editCourse) //put


module.exports = router;