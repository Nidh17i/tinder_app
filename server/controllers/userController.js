import { TinderUser } from "../models/User.js";
import { UserConnection } from "../models/Connection.js";


export const Feed=async(req,res)=>{
    try{
        const userId=req.user._id;
      
        
        const user=await TinderUser.findById(userId).select("friends ignore")
       // console.log('friends and igonre user',user)
      

        const connections=await UserConnection.find({
            $or:[
                {senderUser:userId},
                {receiverUser:userId}
            ]
        });
       // console.log('connections ',connections);
        const skipUser=new Set();

        skipUser.add(String(userId));
        user.friends.forEach(id=>skipUser.add(String(id)));
        user.ignore.forEach(id=>skipUser.add(String(id)));

        connections.forEach(conn =>{
            skipUser.add(String(conn.senderUser));
            skipUser.add(String(conn.receiverUser));

    })
   // console.log('skipusers',[...skipUser]);

    const feedUsers=await TinderUser.find({
        _id:{$nin :[...skipUser]}
    }).select('name username city state');

    return res.status(200).json({
        message:"FeedUsers fetched sucessfully",
        feed:feedUsers,
    })
}
    catch(err){
    return res.status(500).json({
        message:err.message
    });

    }
}

export const pendingRequests=async(req,res)=>{
    try{
        const userId=req.user._id;

        const request=await UserConnection.find({
            receiverUser:userId,
            status:"pending",
    }).populate("senderUser","name username city ");

    return res.status(200).json({
        message:"Incoming Request",
        request:request,
    });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

export const friendList=async(req,res)=>{
    try{
        const user=await TinderUser.findById(req.user._id).
        populate('friends','name username age city');

        res.status(200).json(
            {
                message:"friends..",
                friend:user.friends
            }
        );
    }catch(err){
        res.status(500).json({message:err.message});
    }
}


export const updateProfile=async(req,res)=>{
  try{
    const userId=req.user._id;
    console.log(userId);
    const allowedFields=["name","age","gender","state","city"];

    const updateData={};

    allowedFields.forEach(field=>{
      if(req.body[field] != undefined){
        updateData[field]=req.body[field];
      }

    });

    const updateUser=await TinderUser.findByIdAndUpdate(
      userId,
      {$set:updateData},
      {new:true}
    ).select("-password")

    return res.status(200).json({
      message:"profile updated successfully..",
      user:updateUser
    })
  }
   catch (err) {
        return res.status(500).json({ message: err.message });
    }
}





