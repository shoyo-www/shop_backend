const mongoose = require('mongoose');

const wishListSchema = mongoose.Schema({
    productName : {
        type : String,
        required : true
       },
       productPrice : {
        type : Number,
        required : true
       },
       quantity : {
        type : Number,
        required : true
       },
       description : {
        type : String,
        required : true
       },
       category : {
        type: String,
        required : true
       },
       subCategory : {
        type: String,
        required : true
       },
       images : [
       {
        type : String,
        required : true
       }
       ],
       sizes : [
          {
           type : String,
           required : true
          }
       ],
       popular : {
        type : Boolean,
        default : true
       },
       recommend : {
        type : Boolean,
        default : false
       },
    
});

const WishList = mongoose.model("WishList", wishListSchema);

module.exports = WishList;
