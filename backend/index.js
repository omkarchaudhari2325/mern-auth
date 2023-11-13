import express from "express"
import dotenv from "dotenv"
import dbConnect from "./config/db_connect.js"
dotenv.config();
import userRoute from "./routes/route.js"
const PORT = process.env.PORT || 3000
const app = express();
dbConnect();

app.use("/api/user",userRoute);
app.listen(PORT,() =>{
    console.log("server is running at port " + PORT)
})
