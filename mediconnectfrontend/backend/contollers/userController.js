//register user
import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name || ! email || ! password){
            return res.json({successs:false, message:"Message Details"});
        }
        if(!validator.isEmail(email)){
            return res.json({successs:false, message:"Enter a valid email "}); 
        }
        if(password.length<8){
            return res.json({successs:false, message:"Enter a strong password with minlength 8"});
        }
        //hashing
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt);
        const userData={
            name,
            email,
            password:hashedPassword
        }
        //create new user
        const newUser=new userModel(userData);
        const user=await newUser.save()

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET )
        res.json({success:true,token});
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await userModel.findOne({email});

        if(!user){
            res.json({success:false,message:'User not exists'})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({successs:true,token})
        }else{
            res.json({success:false, message:"Invalid crediantials "});
        }

    }  catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


export {registerUser,loginUser}