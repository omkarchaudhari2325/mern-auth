import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js";
export const signup = async (req,res) =>{
    // console.log(req.body);
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(500).json({
            success : false,
            message : "Please fill all the  fields"
        })
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword =  bcrypt.hashSync(password,salt);
    try{
            const existingUser = await User.findOne({email});
            console.log(existingUser)
            if(existingUser){
                return res.status(500).json({
                    success : false,
                    message : "email already exist"
                })
            }
            const newUser =  new User({username,
                                        email,
                                         password : hashedPassword});
            await newUser.save();
             res.status(200).json({
            success : true,
            message : "User created Succesfully",
            user : newUser
     })
    }
    catch(err){
        // return res.errorHandler(500,"Something error happened")
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }



}
