const mongoose=require("mongoose");
require('dotenv').config();


const connectDB=async()=>{
    const dbUrl=process.env.MONGO_URL;
    try{
        await mongoose.connect(dbUrl);
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }

}
module.exports=connectDB;