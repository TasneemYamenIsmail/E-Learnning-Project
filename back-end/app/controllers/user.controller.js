const User = require('../db/models/user.model');
const responseCreator = require('../helpers/response.helper');
const sendActivationEmail = require('../helpers/sendEmail.helper');

const addUser = async(req,res)=>{
    try{
        const user = new User(req.body);
        await user.save();
        sendActivationEmail(user.email, `activation link http://localhost:4200/activate-user/${user._id}`)
        const response = responseCreator(true, user, 'User Registerd Successfully');
        res.status(200).send(response)
    }
    catch(e){
        const response = responseCreator(false, e.message, 'Error Registering User');
        res.status(500).send(response)
    }
}

const getUser = async(req,res)=>{
    try{
        const id= req.params.id;
        const user =  await User.findOne({_id:id})
        if(!user)
            res.status(404).send(responseCreator(false, {}, 'User Not Found'))
        const response = responseCreator(true, user, 'User Loaded Successfully');
        res.status(200).send(response)
    }
    catch(e) {
        const response = responseCreator(true, e.message, 'User Loading Error');
        res.status(500).send(response)
    }
}

const activateUser = async(req,res)=>{
    try{
        const id= req.params.id;
        const user =  await User.findOne({_id:id})
        if(!user)
            res.status(404).send(responseCreator(false, {}, 'User Not Found'))
        if(user.status)
            res.status(404).send(responseCreator(true, {}, 'User Already Active'))
        user.status = true;
        await user.save()
        const response = responseCreator(true, user, 'User Activated Successfully');
        res.status(200).send(response)
    }
    catch(e){
        const response = responseCreator(false, e.message, 'User Activated Error');
        res.status(500).send(response)
    }
}

const login = async(req,res)=>{
    try{
        const user = await User.findCredientials(req.body.email, req.body.password);
        if(!user)
            res.status(404).send(responseCreator(false, {}, 'User Not Found'))
        if(!user.status)
            res.status(404).send(responseCreator(false, {}, 'User Not Activated'))
        const token = await user.generateToken();

        const response = responseCreator(true, {user, token}, 'User Logged In Successfully');
        res.status(200).send(response)
    }
    catch(e){
        const response = responseCreator(false, e.message, 'LogIn Error');
        res.status(500).send(response)
    }
}

const getProfile = async(req,res)=>{
    try{
        const user = req.user;
        if(!user)
            res.status(404).send(responseCreator(false, {}, 'User Not LoggedIn'))
        const response = responseCreator(true, user, 'User profile loaded Successfully');
        res.status(200).send(response)
    }
    catch(e) {
        const response = responseCreator(false, e.message, 'User Loading Error');
        res.status(500).send(response)
    }
}

const logout = async(req,res)=>{

    try{
        const user = req.user;
        if(!user)
            res.status(404).send(responseCreator(false, {}, 'User Not Authorized'))
        user.tokens = [];
        await user.save();
        const response = responseCreator(true, {}, 'User Logged Out Successfully');
        res.status(200).send(response)
    }
    catch(e){
        const response = responseCreator(false, e.message, 'Logged Out Error');
        res.status(500).send(response)
    }
}

const upload = async(req,res)=>{
    req.user.img = req.file.path
    await req.user.save()
    res.send('done')
}

const updateUser = async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});
        if(!user)
            res.status(404).send(responseCreator(false, {}, 'User Not Found'))

        const response = responseCreator(true, user, 'User Updated Successfully');
        res.status(200).send(response)
    }
    catch(e){
        const response = responseCreator(false, e.message, 'Update Error');
        res.status(500).send(response)
    }
}

const deleteUser = async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user)
            res.status(404).send(responseCreator(false, {}, 'User Not Found'))

        const response = responseCreator(true, user, 'User Deleted Successfully');
        res.status(200).send(response)
    }
    catch(e){
        const response = responseCreator(false, e.message, 'Delete Error');
        res.status(500).send(response)
    }
}

const getAllUsers = async(req,res)=>{
    try{
        const users =  await User.find();

        const response = responseCreator(true, users, 'Users Loaded Successfully');
        res.status(200).send(response)
    }
    catch(e) {
        const response = responseCreator(true, e.message, 'Users Loading Error');
        res.status(500).send(response)
    }
}

const getUserCourses = async(req,res)=>{
    try{
        const user = req.user
        await user.populate({
            path: 'userCourses'
        }).execPopulate();

        const response = responseCreator(true, user.userCourses, 'Users Courses Loaded Successfully');
        res.status(200).send(response)
    }
    catch(e) {
        const response = responseCreator(true, e.message, 'Users Courses Loading Error');
        res.status(500).send(response)
    }
}

module.exports ={
    addUser, 
    activateUser, 
    login, 
    logout, 
    upload,
    getProfile,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserCourses
}