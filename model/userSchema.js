const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxlength: [30, "Name cannot exceed  30 character"],
        minlength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"] 
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        maxlength: [15, "Password cannot exceed  15 character"],
        minlength: [8, "Password should be greater than 8 characters"],
        select: false
    },
    avatar: {
       type: 'String',
       default: "dummy.png"
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    return token;
}

userSchema.methods.comparePassword = async function(candidatePassword, next) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}


module.exports = mongoose.model('User', userSchema);