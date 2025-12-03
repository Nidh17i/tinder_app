import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "firstname is required"],
   trim: true,
    min: [2, "to short name"],
    max: [20, "to long name"],
  },
  lastname: {
    type: String,
    required: [true, "lastname is required"],
    trim: true,
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
  city:{
        type:String,
        required:[true,'Enter city name']
      },
  Tech:{
    type:String,
    required:[true,'Enter Tech ']
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
      

  friends: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'tinderuser'

    }
  ],
  ignore: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'tinderuser'

    }
  ],

 
});

export const TinderUser = mongoose.model("tinderuser", userSchema);

