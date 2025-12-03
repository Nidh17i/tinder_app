import { TinderUser } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res) => {
  try {
    const { firstname,lastname, username, email, password,city,Tech } = req.body;
   // console.log(req.body);
   

    if (!firstname || !lastname|| !username || !email || !password|| !city|| !Tech) {
     return res.status(404).json({ message: "All are filed required" });
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
      city
    });

    const token = jwt.sign({ id: user._id }, process.env.Secret_Key, {
      expiresIn: "1h",
    });
   res.cookie("token", token,{httpOnly:true,secure:false,sameSite:"lax"});


   return res.status(201).json({ message: "user Signup Sucessfully" , user,token});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All filed required" });

    const user = await TinderUser.findOne({ email });
    if (!user) return res.status(404).json({ message: "Invaild email " });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(404).json({ message: "invaild password" });

    const token = jwt.sign({ id: user._id }, process.env.Secret_Key, {
      expiresIn: "1h",
    });
   res.cookie("token", token,{httpOnly:true,secure:false,sameSite:"lax"});


   return res.status(201).json({ message: "login sucessfully",user});
  } catch (err) {
   return res.status(500).json({ error: err.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({ message: "logged out successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

