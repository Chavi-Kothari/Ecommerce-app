import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import express from 'express';
import conncetDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"
conncetDB();
const app=express();
//esmodule file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'./client/build')))
//routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/product",productRoute)

//rest apis
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

const PORT = process.env.PORT || 8080;

app.listen(PORT,(req,res)=>{
    console.log(`server listening at ${PORT}`)
})
//
