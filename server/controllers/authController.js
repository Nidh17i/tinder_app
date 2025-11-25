import { TinderUser } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res) => {
  try {
    const { name, username, email, password, age, gender, state, city } =
      req.body;
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

export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "logged out successfully" });
};

export const findUser = async (req, res) => {
  try {
    const { query } = req.query;
   // console.log("query..", query);
    const token = req.cookies.token;
    const decode = jwt.verify(token, "secure");
    const curr_id = decode.id;
    //console.log('cuur id',curr_id);
    const users = await TinderUser.find({
      $and: [{ _id: { $ne: curr_id } }],
      $or: [
        { name: { $regex: `^${query}`, $options: "i" } },
        { email: { $regex: `^${query}`, $options: "i" } },
      ],
    });
    if (users.length <= 0)return res.status(404).json({ message: "No User Found" });
   
    return res.status(200).json({ message: "fetch User", users });
    // console.log(users)
  
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const sendFriendReq=async (req,res)=>{
  try{
  const sender=req.user._id;
   //console.log(sender);
  const {reciever}=req.body;
   // console.log(reciever);

  const userExit=await TinderUser.findById(reciever);
  if(userExit.length <=0) return res.status(400).json({message:'no user available'});
  //console.log(userExit);

  const index=req.user.friends.findIndex(id => id.equals(reciever))
  //console.log('index',index);

  if(index != -1) return res.status(400).json({message:'already Friends'});

  const Recindex=userExit.pending_friends.findIndex(id=> id.equals(req.user._id));
  console.log('Rec pendingList Index',Recindex);
   if(Recindex != -1) return res.status(400).json({message:'already send Request'});

   

  
   userExit.pending_friends.push(req.user);

  console.log('pending Frineds',userExit.pending_friends);
  userExit.save();
  //console.log(userExit);
  return res.status(200).json({message:'Send friendrequest'})

  }catch(err){
    return res.status(500).
    json({message:err.message});
  }


}


export const acceptFrinedReq=async (req,res)=>{
  try{

  const {friendId}=req.body;
  //console.log('friendId',friendId);
 
 const reciever=req.user._id;
 //console.log('reciever..',reciever);

 const existUser=await TinderUser.findById(friendId);
 //console.log(existUser);
 
 if(!existUser) return res.status(404).json({message:'no user exist'});

  const index=req.user.pending_friends.findIndex(id=> id.equals(friendId));
  if(index != -1){

    existUser.friends.push(reciever);
    existUser.save();

    req.user.friends.push(friendId);
    req.user.save();

  }
  console.log('existuserfriendList',existUser.friends);
  console.log('selffriendlist',req.user.friends);
}
  catch(err){
    res.status(500).
    json({message:err.message});
  }
}

