const express = require('express');
const mongoose = require('mongoose');
const Cart = require('../models/wishlist');
const Product = require('../models/product');
const verify = require('./verify_token');
const wishlistRouter = express.Router();

wishlistRouter.post('/api/add-cart', verify, async (req, res) => {
    try {
      const { id } = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ status: false, msg: 'Invalid product ID' });
      }
  
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const existingProduct = await WishList.findOne({ productName: product.productName });
      if (existingProduct) {
        return res.status(400).json({ status: false, msg: 'Product already added to wishlist' });
      }
  
      const list = new WishList({
        productName: product.productName,
        productPrice: product.productPrice,
        quantity: product.quantity,
        description: product.description,
        category: product.category,
        subCategory: product.subCategory,
        images: product.images,
        sizes: product.sizes,
        popular: product.popular,
        recommend: product.recommend,
      });
  
      await list.save();
  
      res.status(201).json({ message: 'Product added to wishlist', wishlist: list });
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  



module.exports = wishlistRouter;
