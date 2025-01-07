const mongoose = require('mongoose');

const cartListSchema = mongoose.Schema({
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
       productQuantity : {
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

const Cartlist = mongoose.model("WishList", cartListSchema);

module.exports = Cartlist;
