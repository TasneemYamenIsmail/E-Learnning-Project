const router = require('express').Router();
const controller = require('../app/controllers/user.controller');
const auth = require('../app/middleware/auth');
const teacherStudentAuth = require('../app/middleware/teacherStudentAuth');
const upload = require('../app/middleware/upload')

router.get('', (req,res)=>{
    res.send('Welcome to Our ELearning App')
});

router.post('/register', controller.addUser);
router.get('/user/:id', controller.getUser);
router.get('/activate/:id', controller.activateUser);
router.post('/login', controller.login);

router.post('/logout', auth, controller.logout);
router.get('/profile', auth, controller.getProfile);
router.post('/profileImg', auth, upload.single('profileImg'), controller.upload);


router.patch('/updateUser/:id', auth,  teacherStudentAuth, controller.updateUser);
router.delete('/deleteUser/:id', auth, controller.deleteUser);
router.get('/allUsers', auth, controller.getAllUsers);

 module.exports = router;


 