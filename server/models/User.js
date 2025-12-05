import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Firstname is required"],
    trim: true,
    minlength: [2, "Too short name"],
    maxlength: [20, "Too long name"],
  },

  lastname: {
    type: String,
    required: [true, "Lastname is required"],
    trim: true,
    minlength: [2, "Too short name"],
    maxlength: [20, "Too long name"],
  },

  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [4, "Username too short"],
    maxlength: [8, "Username too long"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },

  city: {
    type: String,
    required: [true, "City is required"],
  },

  Tech: {
    type: String,
    required: [true, "Tech field is required"],
  },

  age: {
    type: Number,
    min: [18, "Age must be 18 or above"],
    max: [65, "Age cannot exceed 65"],
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
