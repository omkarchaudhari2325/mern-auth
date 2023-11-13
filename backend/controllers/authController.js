import User from "../models/User.js"
import bcrypt from "bcryptjs"
export const signup = async (req,res) =>{
    // console.log(req.body);
    const {username,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    try{
            const newUser =  new User({username,
                                        email,
                                         password : hashedPassword});
            await newUser.save();
            return res.status(200).json({
            success : true,
            message : "User created Succesfully",
            user : newUser
     })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }



}
