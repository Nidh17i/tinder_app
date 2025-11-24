import dotenv from 'dotenv';
import express from 'express'
import { connectDB } from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser';

dotenv.config();

const app=express();
app.use(express.json());
app.use(cookieParser())

app.use('/auth',authRoutes);


connectDB();

app.listen(8080);