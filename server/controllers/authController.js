
import { TinderUser } from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userSignup=async(req,res)=>{

    try{
    const {name,username,email,password}=req.body;
    const hashpassword= await bcrypt.hash(password,10);  

    if(!name||!username||!email|| !password){
        res.status(404).json({message:'All filed required'});
    }
    const userExists=await TinderUser.findOne({email});
    if(userExists){
        res.status(404).json({message:'user already exists'});

    }
    
    const user= await TinderUser.create({
        name,
        username,
        email,
        password:hashpassword,
    })
    
    const token=jwt.sign({id:user._id},'secure',{expiresIn: '1h'})
    res.cookie('token',token);

    res.status(201).json({message:'user Signup Sucessfully'},user,token);

    }catch(err){
         res.status(500).json({error:err.message});
    }



}
export const userLogin=async (req,res)=>{
    try{
        const{email,password}=req.body;

        if(!email|| !password) return res.status(400).json({message:'All filed required'})

        const user= await TinderUser.findOne({email});
        if(!user)return  res.status(404).json({message:'Invaild email '});
        
        const checkPassword= await bcrypt.compare(password,user.password);
        if(!checkPassword) return res.status(404).json({message:'invaild password'});

        const token=jwt.sign({id:user._id},'secure',{expiresIn: '1h'})
        res.cookie('token',token);

        res.status(201).json({message:'login sucessfully',user});

    }catch(err){
        res.status(500).json({error: err.message})

    }

}