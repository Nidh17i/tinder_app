import { TinderUser } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, city, Tech } =
      req.body;
    // console.log(req.body);

    if (
      !firstname ||
      !lastname ||
      !username ||
      !email ||
      !password ||
      !city ||
      !Tech
    ) {
      return res.status(400).json({ message: "All are filed required" });
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
 const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters, include uppercase, lowercase, number and special character",
      });
    }
     const usernameRegex = /^[a-zA-Z0-9_]{4,8}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message: "Username must be 4-8 characters long and contain only letters, numbers, or underscore",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const userExists = await TinderUser.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "user already exists" });
    }

    const user = await TinderUser.create({
      firstname,
      lastname,
      username,
      email,
      password: hashpassword,
      Tech,
      city,
    });

    const token = jwt.sign({ id: user._id }, process.env.Secret_Key, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res
      .status(201)
      .json({ message: "user Signup Sucessfully", user, token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(401).json({ message: "All filed required" });

    const user = await TinderUser.findOne({ email });
    if (!user) return res.status(404).json({ message: "Invaild email " });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(401).json({ message: "invaild password" });

    const token = jwt.sign({ id: user._id }, process.env.Secret_Key, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({ message: "login sucessfully", user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({ message: "logged out successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export const selfInfo=async(req,res)=>{
  try{
    const user=req.user;
   // console.log(user);
    return res.status(200).json({message:"Self Info",user:req.user})
  }catch(err){
   return  res.status(500).json({error:err.message});
  }
}