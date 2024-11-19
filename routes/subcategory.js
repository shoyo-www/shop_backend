const express = require('express');
const SubCategory = require('../models/subCategory');

const subRouter = express.Router();

subRouter.post('/api/add-subcategory', async (req,res)=>  {
    try {
       const {categoryId,categoryName,image,subCategoryName} = req.body;
       const subCategory = new SubCategory({categoryId,categoryName,image,subCategoryName});
       await subCategory.save();
       res.status(201).json({msg : "added successfully"});
    } catch (error) {
        res.status(400).json({msg : error.message});
        console.log(error);
    }
});

subRouter.get('/api/subCategories/:categoryName',async(req,res)=>{
    try {
    const {categoryName} = req.params;
    const subcategories = await SubCategory.find({categoryName: categoryName});
    if(!subcategories || subcategories. length == 0){
    return res.status(404).json({msg:"subcategories not found"}) ;
    }else{
    return res.status(200).json({msg : "fetched successfully",subcategories}) ;
    }
} catch (error) {
    res.status(500).json({msg : error.message});
    console.log(error);
}
});


module.exports = subRouter;