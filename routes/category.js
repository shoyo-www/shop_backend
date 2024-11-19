const express = require('express');
const category = require('../models/category');
const Category = require('../models/category');
const verify = require('./verify_token');
const router = express.Router();

router.post('/api/addCategory', async (req,res)=>  {
    try {
       const {name,image} = req.body;
       const category = new Category({name,image});
       await category.save();
       res.status(201).json({status : true,msg : "added successfully"});
    } catch (error) {
        res.status(400).json({status : false,msg : error.message});
        console.log(error);
    }
});

router.get('/api/category' , verify,async (req,res)=> {
    try {
        const category = await Category.find();
        res.status(200).json({status : true,msg : "fetched successfully" , category});
    } catch (error) {
        res.status(500).json({status : false,msg : error.message});
    }
});

module.exports = router;