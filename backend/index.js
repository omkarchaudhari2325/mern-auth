import express from "express"
import dotenv from "dotenv"
import dbConnect from "./config/db_connect.js"
dotenv.config();
import userRoute from "./routes/route.js"
import authRoute from "./routes/auth.js"
const PORT = process.env.PORT || 3000
const app = express();
dbConnect();
app.use(express.json());
app.use("/api/user",userRoute);
app.use("/api/auth" ,authRoute)
app.listen(PORT,() =>{
    console.log("server is running at port " + PORT)
})
