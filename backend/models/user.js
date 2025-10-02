const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportGoogleOAuth=require("passport-google-oauth20");

const userSchema=new Schema({
    googleId:{
        type:String,
        unique:true,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    givenName:String,
    familyName:String,
    email:{
        type: String,
        required: true,
        unique:true
    },
    conversations:[{
        type:Schema.Types.ObjectId,ref:"Conversation"
    }],
    profilePic:{
        type:String,
        unique:true

    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);