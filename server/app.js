import dotenv from 'dotenv';
import express from 'express'
import { connectDB } from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import userActionRoutes from './routes/connectionRoute.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();


const app=express();
//console.log(process.env.FRONTED_URL);

const corsOptions={
    origin:process.env.FRONTED_URL,
    methods:"GET,POST,DELETE,PATCH,PUT,HEAD",
    credentials:true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());





app.use('/auth',authRoutes);
app.use('/user', userActionRoutes)
app.use('/users',userRoutes)


connectDB();


app.listen(8080);