import { UserConnection } from "../models/Connection.js";
import { TinderUser } from "../models/User.js";

export const handleUserAction = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.receiverUser;
    const action = req.params.status;

    // console.log(action);
    //console.log(receiverId);

    const allowedActions = ["interested", "ignored"];
    if (!allowedActions.includes(action)) throw new Error("Invalid action");

    const sender = await TinderUser.findById(senderId);
    const receiver = await TinderUser.findById(receiverId);
    if (!receiver) throw new Error("user not found");

    if (senderId.toString() === receiverId) {
      return res.status(400).json({ message: "Invalid request " });
    }

    if (action === "ignored") {
      if (!sender.ignore.includes(receiverId)) {
        sender.ignore.push(receiverId);
        await sender.save();
      }
      return res.status(201).json({ message: "action Ignored" });
    }
    

    const existingConnection = await UserConnection.findOne({
      senderUser: senderId,
      receiverUser: receiverId,
    });

    if (existingConnection) throw new Error("you are already intrested");

    const connection = await UserConnection.create({
      senderUser: senderId,
      receiverUser: receiverId,
      status: "pending",
    });
    return res
      .status(200)
      .json({ message: `Request sent ${receiver.name}!`, connection });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
 
};


