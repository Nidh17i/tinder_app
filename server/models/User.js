import mongoose from "mongoose";
import { ref } from "process";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    min: [2, "to short name"],
    max: [20, "to long name"],
  },
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username already exists"],
    min: [4, "too short..."],
    max: [8, "to.. long"],
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase:[true,'enter valid mail'],
    required: [true, "enter email"],
    unique: [true, "enter vaild mail"],
  },
  // not required
   age:{
        type:Number,
        min:[18,'Age must be 18 or above'],
        max:65
      },
      gender:{
        type:String,
        enum:['Male','Female','Other']
      },
      state:{
        type:String
      },
      city:{
        type:String
      },
  friends: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'tinderuser'

    }
  ],
  pending_friends:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'tinderuser'
    }
  ],
 
});

export const TinderUser = mongoose.model("tinderuser", userSchema);



