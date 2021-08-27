const User = require('../db/models/user.model');

const teacherStudentAuth = async function (req, res, next) {

    try{
        const activeUser = req.user;
        const passiveUser =  await User.findOne({_id:req.params.id});

        const validAction = (activeUser.role === "teacher" && passiveUser.role === "teacher" && activeUser.id === passiveUser.id) ||
                            (activeUser.role === "student" && passiveUser.role === "student" && activeUser.id === passiveUser.id)
                            // (activeUser.role === "teacher" && passiveUser.role === "student" && activeUser.userCourses.students.includes(passiveUser.id)) ||
   
        if(!validAction){
            throw new Error('You are not allowed to contine this action')
        }
        next();
    }
    catch(e){
        res.status(500).send({
            apistatus:false,
            data:e.message,
            message:"Not Allowed"
        })
    }

}

module.exports = teacherStudentAuth;
