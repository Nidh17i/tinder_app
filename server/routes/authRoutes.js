
import express from "express";
import { userSignup,userLogin,logoutUser} from "../controllers/authController.js";


const router=express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);
router.post('/logout',logoutUser)




export default router;
