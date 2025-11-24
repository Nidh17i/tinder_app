import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,'namme likhna jaruri hai'],
    min:[2,'to short name'],
    max:[20,'to long name']

  },
  username:{
    type:String,
    required:[true,'username likhna jaruri hai'],
    unique:[true,'aviable Enter unique'],
    min:[4,'too short...'],
    max:[8,'to.. long'],
 },
 password:{
  type:String,
  required:true

 },
 email:{
type:String,
required:[true,'enter email'],
unique:[true,'all aviable..'],
 }

})

export const TinderUser=mongoose.model('tinderuser',userSchema);




