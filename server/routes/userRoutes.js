import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { Feed, friendList, pendingRequests, pendingSentRequests, updateProfile } from '../controllers/userController.js';
import { selfInfo } from '../controllers/authController.js';


const router=express.Router();

router.get('/feed',isAuthenticated,Feed);
router.get('/request',isAuthenticated,pendingRequests);
router.get('/friends',isAuthenticated,friendList);
router.get('/sent', isAuthenticated, pendingSentRequests);



router.put("/profile",isAuthenticated,updateProfile);

export default router;