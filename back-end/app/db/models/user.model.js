const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique:true,
        lowerCase: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Invalid Email')
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        min:8,
        match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
        validate(value){
            if( value.toLowerCase().includes('123') ||
            value.toLowerCase().includes('pass') ||
            value.toLowerCase().includes('password') ||
            value.toLowerCase().includes(this.name) ||
            value.toLowerCase().includes(this.email) )
                    throw new Error('Invalid Email')
        }
    },
    phone:{
        type: String,
        trim: true,
        validate(value){
            if(value && !validator.isMobilePhone(value, ['ar-EG'])) throw new Error('invalid phone number')
        }
    },
    img:{
        type: String,
        default: ''
    },
    tags:[
        {tag:{ type: String}}
    ],
    role:{
        type: String,
        trim: true,
        required: true,
        lowerCase:true,
        validate(value){
            if(value!=='teacher' && value!=='student')
                throw new Error('Invalid User Type')
        }
    },
    grade: {
        type: Number
    },
    status:{
        type: Boolean,
        default: false
    },
    tokens:[
        { token:{type:String}}
    ]
}, {timestaps: true});

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 16);
    }
    next();
})

userSchema.statics.findCredientials = async function(email, password) {

    const user = await User.findOne({email});
    if(!user)
        throw new Error('User Not Found');

    const isValidPass = await bcrypt.compare(password, user.password);
    if(!isValidPass)
        throw new Error('Password Not Valid');
    if(user.tokens.length>=10)
        throw new Error('Exceeded number of logins');
    return user;
}

userSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({_id:user._id}, process.env.JWTSECURITY);
    user.tokens = user.tokens.concat({token});
    await user.save()
    return token
}

userSchema.virtual('userCourses', {
    ref:'Course',
    localField:"_id",
    foreignField:"userId"
})


const User = mongoose.model('User', userSchema);
module.exports = User;