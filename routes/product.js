const express = require('express');
const Product = require('../models/product');
const verify = require('./verify_token');

const productRouter = express.Router();

productRouter.post('/api/add-product',async (req,res)=>  {
    try {
       const {productName,productPrice,quantity,description,category,subCategory,images,popular,recommend} = req.body;
       const product = new Product({productName,productPrice,quantity,description,category,subCategory,images,popular,recommend});
       await product.save();
       res.status(201).json({msg : "product added successfully"});
    } catch (error) {
        res.status(400).json({msg : error.message});
        console.log(error);
    }
});

productRouter.get('/api/products',verify,async(req,res)=>{
    try {
    const product = await Product.find();
    return res.status(200).json({status : true,msg : 'fetched successfully' , product})
} catch (error) {
    res.status(500).json({status : false,msg : error.message});
    console.log(error);
}
});


module.exports = productRouter;