const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = 3000;
const DB = process.env.DB;
const authRouter = require('./routes/auth');
const bannerRouter = require('./routes/banner');
const categoryRouter = require('./routes/category');
const subCategoryRouter = require('./routes/subcategory');
const productRouter = require('./routes/product');
const wishlist_controller = require('./routes/wishlist_controller');
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ msg: "Server is working" });
});
app.use(authRouter);
app.use(bannerRouter);
app.use(categoryRouter);
app.use(subCategoryRouter);
app.use(productRouter);
app.use(wishlist_controller);
mongoose.connect(DB).then(()=> {
    console.log('conected');
});
app.listen(PORT,"0.0.0.0", (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
}
);