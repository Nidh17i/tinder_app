import { TinderUser } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res) => {
  try {
    const { name, username, email, password,age,gender,state,city } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);

    if (!name || !username || !email || !password) {
      res.status(404).json({ message: "All filed required" });
    }
    const userExists = await TinderUser.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "user already exists" });
    }

    const user = await TinderUser.create({
      name,
      username,
      email,
      password: hashpassword,
    });

    const token = jwt.sign({ id: user._id }, "secure", { expiresIn: "1h" });
    res.cookie("token", token);

    res.status(201).json({ message: "user Signup Sucessfully" }, user);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

    const token = jwt.sign({ id: user._id }, "secure", { expiresIn: "1h" });
    res.cookie("token", token);

    res.status(201).json({ message: "login sucessfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const findUser=async(req,res)=>{
  try{
    const {query}=req.query;
   console.log('query..',query);
    const token = req.cookies.token;
    const decode = jwt.verify(token, "secure");
    const curr_id=decode.id;
    //console.log('cuur id',curr_id);
    const users= await TinderUser.find({
      $and:[
         
        {_id :{$ne: curr_id}}
      ],
      $or:[
        {name: {$regex :`^${query}` ,$options: "i" }},
        {email:{$regex:`^${query}`,$options:"i"}}

      ]

    })
    if(users.length<=0) return res.status(404).json({message:'No User Found'});
    return res.status(200).json({message:'fetch User',users});
    // console.log(users)
    

  }catch(err){
    return res.status(500).json({message:err.message})

  }
}

export const logoutUser=async(req,res)=>{
  res.clearCookie("token")
  res.status(200).json({message:'logged out successfully'});
}

