import mongoose from "mongoose";

const UserSchena=new mongoose.Schema({
    name:{
     type:String,
     required:[true,'Please TYpe a Name !'],
    },

    user_name:{
        type:String,
        required:[true,'Please Type a User Name!'],
      },

      email:{
        type:String,
        required:[true,'Please Type an Email!'],
        unique:true
      },
      password:{
        type:String,
        required:[true,"Please Type a PassWord!"],
      },
      profession:{
        type:String,
        required:[true,"Please Type a Profession!"],
      },


      accepted:[{}],
      rejected:[{}],
      matches:[{}],
      
})

export const TinderUser=mongoose.model('tinderUser',UserSchena)

