const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();

authRouter.post('/api/signUp', async (req,res)=>  {
    try {
        const {fullName ,email,password} = req.body;
        const emailExist =  await User.findOne({email});
        if (emailExist) {
            return res.status(400).json({status : false,msg : "User already exist"});
        } else {
            const hash = await bcrypt.genSalt(10);
            const hashedPasss = await bcrypt.hash(password,hash);
            var user = new User({fullName,email,password : hashedPasss});
            await user.save();
            res.json({status : true,msg : "Account created successfully"});
        }
    } catch (error) {
        res.status(500).json({status: false,msg : error.message});
        console.log(error);
    }
});


authRouter.post('/api/login' , async (req,res)=> {
    try {
        const {email,password} = req.body;
        const userExist = await User.findOne({email});
        if(!userExist) {
           return res.status(400).json({status : false,msg : "No user found Please register first "});
        } else {
            const isMatched = await bcrypt.compare(password,userExist.password);
            if(!isMatched) {
                return res.status(400).json({status : false,msg : "Incorrect password"});
            } else {
                const token = jwt.sign({id: userExist._id},"passKey");
                const {password ,...userWithoutPass} = userExist._doc;
                res.json({status: true, msg : 'login successfuly',token, userData : {...userWithoutPass}});
            }
        }
    } catch (error) {
        res.status(500).json({status : false,msg : error.message});
    }
});

module.exports = authRouter;