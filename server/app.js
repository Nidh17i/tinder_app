
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js'

dotenv.config();
connectDB();

const app=express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth',authRoutes);


const PORT=8080;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})