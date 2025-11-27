
import mongoose from "mongoose";

const ConnectionSchema=new mongoose.Schema(
    {
     senderUser:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'tinderUser',
        
     },
     receiverUser:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'tinderUser',
     
     },
      status: {
      type: String,
      required: true,
      enum: {
        values: ["accepted","rejected","interested","ignored","pending"],
      },
    },
}
)
export const UserConnection=mongoose.model("userConnection",ConnectionSchema);