const express = require('express');
const mongoose = require('mongoose');
const WishList = require('../models/wishlist');
const Product = require('../models/product');
const verify = require('./verify_token');
const wishlistRouter = express.Router();

wishlistRouter.post('/api/wishlist', verify, async (req, res) => {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, msg: 'Invalid product ID' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ status: false, msg: 'Product not found' });
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
    await Product.findByIdAndUpdate(id, { wishList: true });
    console.log("product" , Product);
    res.status(201).json({ status: true, msg: 'Product added to wishlist' });
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    res.status(500).json({ error: error.message });
  }
});


wishlistRouter.get('/api/getWishlist', verify, async (req, res) => {
  try {
    const product = await WishList.find();
    return res.status(200).json({ status: true, msg: 'fetched successfully', product })
  } catch (error) {
    res.status(500).json({ status: false, msg: error.message });
    console.log(error);
  }
});

wishlistRouter.post('/api/remove-wishlist', verify, async (req, res) => {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, msg: 'Invalid wishlist ID' });
    }
    const wishListItem = await WishList.findById(id);
    if (!wishListItem) {
      return res.status(404).json({ status: false, msg: 'Wishlist item not found' });
    }
    await WishList.findByIdAndDelete(id);
    await Product.findOneAndUpdate(
      { productName: wishListItem.productName },
      { wishList: false }
    );

    res.status(200).json({ status: true, msg: 'Removed Successfully' });
  } catch (error) {
    console.error('Error removing wishlist item:', error);
    res.status(500).json({ status: false, error: error.message });
  }
});



module.exports = wishlistRouter;
