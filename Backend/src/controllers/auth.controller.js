import { generateToken } from "../lib/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const signup=async(req,res)=>{
  
    const {fullName, email,password}= req.body;
    try {
        if(!fullName || !email || !password){

            return res.status(400).json({message:"All fields are required !!"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast of 6 characters"});
            
        }
        const user= await User.findOne({email})
        if(user){

            return res.status(400).json({message:"User already exist"});
        } 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        const newUser= new User({
            fullName,
            email,
            password:hashedPassword,
        })

        if(newUser) 
        {
            // gonna generate JWT here
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })

        }
        else{
            res.status(400).json({message:'Invalid user data'});
            res.status(500).json({message:"Internal server Error"});
        }
    }
    catch(error)
    {
        console.log(`Error in sign up controller ${error.message}`);

    }
   }

export const login=(req,res)=>{
    res.send('login route');

}
export const signout=(req,res)=>{
    res.send('sign out route');

}