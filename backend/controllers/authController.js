import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
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
export const signin = async (req,res,next) =>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(401).json({
            success : false,
            message : "Please fill all the input fields"
        })
    }
    try{
        const validUser = await User.findOne({email});
        if(!validUser) {
            return res.status(401).json({
                success : false,
                message : "Please register first"
            })
        }
        const validPassword = bcrypt.compareSync(password , validUser.password);
        if(!validPassword){
            return res.status(403).json({
                success : false,
                message : "Invalid Credentials Entered"
            })
        }
        validUser.password = undefined;
        const token = jwt.sign({id : validUser._id},process.env.JWT_SECRET,{
            expiresIn : "3h"
        })
        res.cookie("access-token",token,{
            httpOnly : true
        }).status(200).json({
            user : validUser
        })

    }catch(err){
        next(err);
    }
}
