const router = require('express').Router()
const courseController = require('../app/controllers/course.controller')
const upload = require('../app/middleware/upload-file')

router.post('/createCourse',courseController.create)
router.get('/getAllCourse',courseController.getAll)
router.get('/getAllCourse/:id',courseController.getSingleCourse)
router.delete('/deleteCourse/:id',courseController.deleteCourse)
router.patch('/editCourse/:id', courseController.editCourse) //put
router.post('/uploadCourse', upload.single('uploadCourse'),async (req,res)=>{
    req.user.image = req.file.path
    await req.user.save()
    res.send('done')
} )

module.exports = router;