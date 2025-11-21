 import {TinderUser} from '../models/User.js'
 import bcrypt from 'bcryptjs';
 import jwt from 'jsonwebtoken'

 export const signupUser=async(req,res)=>{
    try{
        const{name,user_name,email,password,profession}=req.body;

        const userExists=await TinderUser.findOne({email});
        if(userExists) {
            return res.status(404).json({message:"User already exists"});
        }
            const hashPassword=await bcrypt.hash(password,10);

            const user= await TinderUser.create({
                name,
                user_name,
                email,
                password:hashPassword,
                profession
            });

            const token=jwt.sign(
                {id:user._id},
                'secret',
                {expiresIn:'1d'}
            ) ;
            res.cookie('token',token,{
                httpOnly:true,
            } )


            res.json({message:'User registered',user});

        }
        catch(err){

        res.status(500).json({error:err.message});
       
       
    }
}

export const loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;

        const user=await TinderUser.findOne({email});
        if(!user) return res.status(400).json({message:'Invalid Email'});

        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch) return res.status(400).json({message:'Invalid Password'});
         
            const token=jwt.sign(
                {id:user._id},
                'secret',
                {expiresIn:'1d'}
            ) ;
            res.cookie('token',token,{
                httpOnly:true,
            } )


        res.json({message:'Login Successfully',user});
    }catch(err){
        res.status(500).json({error:err.message});
    }
    }

