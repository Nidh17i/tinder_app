import { UserConnection } from "../models/Connection.js";
import { TinderUser } from "../models/User.js";

export const approveConnectionReq = async (req, res) => {
  try {
    const receiverId = req.user.id;
    const senderId = req.params.senderUser;

    const request = await UserConnection.findOne({
      senderUser: senderId,
      receiverUser: receiverId,
      status: "pending",
    });
    if (!request) throw new Error("No pending request found");

    request.status = "accepted";
    await request.save();

    await TinderUser.findByIdAndUpdate(receiverId, {
      $addToSet: { friends: senderId },
    });

    await TinderUser.findByIdAndUpdate(senderId, {
      $addToSet: { friends: receiverId },
    });
    return res.status(200).json({ message: "both are friends" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const RejectConnectionReq = async (req, res) => {
  try {
    const receiverId = req.user.id;
    const senderId = req.params.senderUser;

    const request = await UserConnection.findOne({
      senderUser: senderId,
      receiverUser: receiverId,
      status: "pending",
    });
    if (!request) throw new Error("No pending request found");

    request.status = "rejected";
    await request.save();

    return res.status(200).json({ message: "Request rejected", request });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
