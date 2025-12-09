
import express from "express";
import { userSignup,userLogin,logoutUser, selfInfo, } from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";


const router=express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);
router.post('/logout',logoutUser)
router.get('/self',isAuthenticated,selfInfo);


export default router;
