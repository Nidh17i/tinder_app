import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { Feed, friendList, pendingRequests, updateProfile } from '../controllers/userController.js';


const router=express.Router();

router.get('/feed',isAuthenticated,Feed);
router.get('/request',isAuthenticated,pendingRequests);
router.get('/friends',isAuthenticated,friendList);

router.put("/profile",isAuthenticated,updateProfile);

export default router;