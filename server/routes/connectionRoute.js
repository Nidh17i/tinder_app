import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { handleUserAction } from "../controllers/requestController.js";
import {
  approveConnectionReq,
  RejectConnectionReq,
} from "../controllers/responseController.js";

const router = express.Router();

router.post("/action/:receiverUser/:status", isAuthenticated, handleUserAction);

router.post("/accept/:senderUser", isAuthenticated, approveConnectionReq);
router.post("/reject/:senderUser", isAuthenticated, RejectConnectionReq);

export default router;
