const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (v) => {
                const result = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return result.test(v);
            },
            message: "please enter vaild email"
        }
    },

    password: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return v.length >= 8;
            },
            message: "Password must be 8 characters long"
        }
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;