const express = require('express');
const Product = require('../models/product');
const mongoose = require('mongoose');
const verify = require('./verify_token');

const productRouter = express.Router();

productRouter.post('/api/add-product',async (req,res)=>  {
    try {
       const {productName,productPrice,quantity,description,category,subCategory,images,popular,recommend,sizes} = req.body;
       if (!productName || !productPrice || !quantity || !category || !images || !sizes) {
        return res.status(400).json({ msg: "Add Required feilds" });
    }
       const product = new Product({productName,productPrice,quantity,description,category,subCategory,images,popular,recommend,sizes});
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

productRouter.get('/api/single/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status : false,msg: "Invalid product ID" });
        }
        const product = await Product.findById(id); 

        if (!product) {
            return res.status(404).json({ status : false,msg: "Product not found" });
        }
        return res.status(200).json({ status : true,msg: "Fetched successfully", product });
    } catch (error) {
        res.status(500).json({ msg: error.message });
        console.error(error);
    }
});

productRouter.get('/api/getCategory/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const product = await Product.find({category}); 

        if (!product) {
            return res.status(404).json({ status : false,msg: "Product not found" });
        }
        return res.status(200).json({ status : true,msg: "Fetched successfully", product });
    } catch (error) {
        res.status(500).json({ msg: error.message });
        console.error(error);
    }
});


module.exports = productRouter;