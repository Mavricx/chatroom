const mongoose=require("mongoose");
const express=require("express");
const Schema=mongoose.Schema;
const messageSchema=new Schema({

},{timestamps:true});

module.exports=mongoose.model("Message",messageSchema);