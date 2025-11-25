
import express from "express";
import { userSignup,userLogin,findUser,logoutUser} from "../controllers/authController.js";
import {isAuthenticated} from "../middleware/isAuthenticated.js"


const router=express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);


router.get('/self',isAuthenticated,(req,res)=>{
   return res.status(200).json({userId:req.user.id});
})


router.post('/logout',logoutUser)
router.get('/finduser',isAuthenticated,findUser)



export default router;
