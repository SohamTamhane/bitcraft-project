const express = require('express');
require('dotenv').config();
const cors = require("cors");
const fileUpload = require("express-fileupload");

const dbConnect = require('./config/database');
const {cloudinaryConnect} = require("./config/cloudinary");

const app = express();
app.use(express.json());
app.use(cors());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp"
    })
)
dbConnect();
cloudinaryConnect();

const PORT = process.env.PORT || 8080;

const AuthRoutes = require('./routes/Auth');
const BlogRoutes = require('./routes/Blog');

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/blog", BlogRoutes);

app.listen(PORT, ()=>{
    console.log(`Server Started at PORT: ${PORT}`);
})