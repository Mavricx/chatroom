import mongoose from "mongoose";
const Schema=mongoose.Schema;
const passportGoogleOAuth=require("passport-google-oauth");

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required: true,
    }
})

userSchema.plugin(passportGoogleOAuth);
module.exports=mongoose.model("User",userSchema);