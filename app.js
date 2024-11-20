const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
const PORT = 3000;
const DB = process.env.DB;
const authRouter = require('./routes/auth');
const bannerRouter = require('./routes/banner');
const categoryRouter = require('./routes/category');
const subCategoryRouter = require('./routes/subcategory');
const productRouter = require('./routes/product');
app.use(express.json());
app.use(cors);
app.get('/', (req, res) => {
    res.json({ msg: "Server is wokring" });
});
app.use(authRouter);
app.use(bannerRouter);
app.use(categoryRouter);
app.use(subCategoryRouter);
app.use(productRouter);
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