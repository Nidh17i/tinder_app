// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("connected.. MonGO");
//   } catch (error) {
//     console.log(error);
//   }
// };
// export default connectDB;
// // monfo connection
//  import {TinderUser} from '../models/User.js'
//  import bcrypt from 'bcryptjs';
//  import jwt from 'jsonwebtoken'

//  export const signupUser=async(req,res)=>{
//     try{
//         const{name,user_name,email,password,profession}=req.body;

//         const userExists=await TinderUser.findOne({email});
//         if(userExists) {
//             return res.status(404).json({message:"User already exists"});
//         }
//             const hashPassword=await bcrypt.hash(password,10);

//             const user= await TinderUser.create({
//                 name,
//                 user_name,
//                 email,
//                 password:hashPassword,
//                 profession
//             });

//             const token=jwt.sign(
//                 {id:user._id},
//                 'secret',
//                 {expiresIn:'1d'}
//             ) ;
//             res.cookie('token',token,{
//                 httpOnly:true,
//             } )


//             res.json({message:'User registered',user});

//         }
//         catch(err){

//         res.status(500).json({error:err.message});
       
       
//     }
// }

// export const loginUser=async(req,res)=>{
//     try{
//         const{email,password}=req.body;

//         const user=await TinderUser.findOne({email});
//         if(!user) return res.status(400).json({message:'Invalid Email'});

//         const isPasswordMatch=await bcrypt.compare(password,user.password);
//         if(!isPasswordMatch) return res.status(400).json({message:'Invalid Password'});
         
//             const token=jwt.sign(
//                 {id:user._id},
//                 'secret',
//                 {expiresIn:'1d'}
//             ) ;
//             res.cookie('token',token,{
//                 httpOnly:true,
//             } )


//         res.json({message:'Login Successfully',user});
//     }catch(err){
//         res.status(500).json({error:err.message});
//     }
//     }

// //auth controller

// import mongoose from "mongoose";

// const UserSchena=new mongoose.Schema({
//     name:{
//      type:String,
//      required:[true,'Please TYpe a Name !'],
//     },

//     user_name:{
//         type:String,
//         required:[true,'Please Type a User Name!'],
//       },

//       email:{
//         type:String,
//         required:[true,'Please Type an Email!'],
//         unique:true
//       },
//       password:{
//         type:String,
//         required:[true,"Please Type a PassWord!"],
//       },
//       profession:{
//         type:String,
//         required:[true,"Please Type a Profession!"],
//       },


//       accepted:[{}],
//       rejected:[{}],
//       matches:[{}],
      
// })

// export const TinderUser=mongoose.model('tinderUser',UserSchena)
// //userschema


// import express from 'express';
// import { signupUser,loginUser } from '../controllers/authController.js';

// const router=express.Router();

// router.post('/signup',signupUser);
// router.post('/login',loginUser);

// export default router;//roueer


// import express from 'express';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import connectDB from './config/db.js';

// import authRoutes from './routes/authRoutes.js'

// dotenv.config();
// connectDB();

// const app=express();

// app.use(express.json());
// app.use(cookieParser());

// app.use('/auth',authRoutes);


// const PORT=8080;

// app.listen(PORT,()=>{
//     console.log(`server running on port ${PORT}`);
// })//app.js

