import express from "express"
import dotenv from "dotenv"
import dbConnect from "./config/db_connect.js"
dotenv.config();
const PORT = process.env.PORT || 3000
const app = express();
dbConnect();
app.listen(PORT,() =>{
    console.log("server is running at port " + PORT)
})
