const express = require('express');
const Banner = require('../models/banner');
const verify = require('../routes/verify_token')

const bannerRouter = express.Router();

bannerRouter.post('/api/addBanner', async (req,res)=>  {
    try {
       const {image} = req.body;
       const banner = new Banner({image});
       await banner.save();
       res.status(201).json({status : true,msg : "added successfully"});
    } catch (error) {
        res.status(400).json({msg : error.message});
        console.log(error);
    }
});

bannerRouter.get('/api/banner' ,verify, async (req,res)=> {
    try {
        const banner = await Banner.find();
        res.status(200).json({status : true,msg : "fetched successfully" , banner});
    } catch (error) {
        res.status(500).json({status : false,msg : error.message});
    }
});

module.exports = bannerRouter;