import { TinderUser } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;


export const userSignup = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, city, Tech } =
      req.body;

    if (!firstname || !lastname || !username || !email || !password || !city || !Tech) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email Format" });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must include upper, lower, number, special character & min 8 chars"
      });
    }

    const emailExists = await TinderUser.findOne({ email });
    if (emailExists)
      return res.status(400).json({ message: "Email already exists" });

    const usernameExists = await TinderUser.findOne({ username });
    if (usernameExists)
      return res.status(400).json({ message: "Username already exists" });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await TinderUser.create({
      firstname,
      lastname,
      username,
      email: email.toLowerCase(),
      password: hashPassword,
      Tech,
      city,
    });

    const token = jwt.sign({ id: user._id }, process.env.Secret_Key, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.status(201).json({
      message: "Signup successful",
      user,
      token,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    const user = await TinderUser.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "Invalid Email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign({ id: user._id }, process.env.Secret_Key, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
