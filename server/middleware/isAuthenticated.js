import { TinderUser } from "../models/User.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
    return res.status(401).json({ error: "No token,authorization denied" });

    const decode = jwt.verify(token, "secure");
    //console.log('decoded ',decode);
   

    req.user = await TinderUser.findById(decode.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not vaild" });
  }
};

