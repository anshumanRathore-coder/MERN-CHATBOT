import User from "../models/User.js"
import {Request,Response,NextFunction} from "express"
import bycrypt from 'bcrypt';
import { createToken } from "../utils/tokenMange.js";
export const getAllUser=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const user=await User.find();
        res.status(200).json({message:"All user fetch succesfully",data:user})
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Error occured",error:error.message});
    }
}

export const signUp=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {name,email,password}=req.body;
        const user=await User.findOne({email});
        if(user){
            return res.status(401).json({message:"User already resgistered"});
        }

        const hashPassword=await bycrypt.hash(password,10);
        const newUser=new User({name,email,password:hashPassword});
        await newUser.save();
        res.clearCookie("auth-token",{
            httpOnly:true,
            signed:true,
            path:"/",
            domain:'localhost'
        })
        const token=createToken(newUser.id.toString(),email,"7d");
        const expires=new Date;
        expires.setDate(expires.getDate()+7);
        res.cookie("auth-token",token,{
            httpOnly:true,
            signed:true,
            expires,
            path:"/",
            domain:'localhost'
        })
        res.status(200).json({message:"User Sign up successfully",newUser})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error occured",error:error.message});
    }
}


export const login=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"User not resgistered"});
        }
        const result=await bycrypt.compare(password,user.password);
        if(!result){
            return res.status(401).json({message:"password in incorrect"});
        }
        res.clearCookie("auth-token",{
            httpOnly:true,
            signed:true,
            path:"/",
            domain:'localhost'
        })
        const token=createToken(user.id.toString(),email,"7d");
        const expires=new Date;
        expires.setDate(expires.getDate()+7);
        res.cookie("auth-token",token,{
            httpOnly:true,
            signed:true,
            expires,
            path:"/",
            domain:'localhost'
        })
        res.status(200).json({message:"User login successfully",user});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Error occured",error:error.message});
    }
}


export const verifyUser=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const user=await User.findOne({email:res.locals.jwtData.email});
        if(!user){
            return res.status(401). json({message:"User not resgistered"});
        }
        res.status(200).json({message:"User login successfully",user});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Error occured",error:error.message});
    }
}