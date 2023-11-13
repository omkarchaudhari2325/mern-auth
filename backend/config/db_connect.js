import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv"
dotenv.config();
const dbConnect = async () =>{
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Database connected successfully")
    }
    catch(err){
        console.log(err);
        process.exit(1)
    }
}

export default dbConnect;
