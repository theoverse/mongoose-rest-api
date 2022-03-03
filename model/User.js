const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        // building validation
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        // custom validation
        validate(value) {
            if (value < 18) {
                throw new Error(`Age can't be less then 18`)
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre('save', async function (next) {

    const user = this;
    user.password = await bcrypt.hash(user.password, 8)

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;