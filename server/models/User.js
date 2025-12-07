import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "firstname is required"],
    trim: true,
    minlength: [2, "too short name"],
    maxlength: [20, "too long name"],
  },

  lastname: {
    type: String,
    required: [true, "lastname is required"],
    trim: true,
    minlength: [2, "too short name"],
    maxlength: [20, "too long name"],
  },

  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username already exists"],
    minlength: [4, "too short..."],
    maxlength: [8, "too long"],
  },

 password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number and one special character",
    ],
  },

  email: {
    type: String,
    lowercase: true,
    required: [true, "enter email"],
    unique: [true, "email already exists"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },

  city: {
    type: String,
    required: [true, "Enter city name"],
  },

  Tech: {
    type: String,
    required: [true, "Enter Tech"],
  },

  // Optional fields
  age: {
    type: Number,
    min: [18, "Age must be 18 or above"],
    max: 65,
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },

  state: {
    type: String,
  },

  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tinderuser",
    },
  ],

  ignore: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tinderuser",
    },
  ],
});

export const TinderUser = mongoose.model("tinderuser", userSchema);
