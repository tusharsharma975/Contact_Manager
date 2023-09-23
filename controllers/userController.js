import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";
//@desc register a user
//@route post /api/users/register
export const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const userAvailable=await userModel.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered")
    }
    //hash password
    const hashedPassword=await bcrypt.hash(password,10)
    const user=await userModel.create({
        username,
        email,
        password:hashedPassword
    }
)
console.log(`User created ${user}`);
if(user){
    res.status(200).json({__id:user.id,email:user.email})
}
else{
    res.status(400)
    throw new Error("User data is not Valid")
}
    res.json({message:"Register the user"});
});
//@desc login a user
//@route post /api/users/login
export const loginUser = asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const user=await userModel.findOne({email});
    if(user&&(await bcrypt.compare(password,user.password))){
       const accessToken=jwt.sign({
         user:{
            username:user.username,
            email:user.email,
            id:user.id,
         },

       },"tushar123" //access token secret
       ,
       {expiresIn:"15m"})
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Email or Password is not Valid")
    }
    
});
//@desc current user info
//@route post /api/users/login
//@access private
export const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
});