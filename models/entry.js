//const express = require('express');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/hiring-priyansh");

const entrySchema= new mongoose.Schema({
    name:String,
    email:String,
    resume:String,
    appliedPosition:String,
    highestQualification:String
}); 

const entries= mongoose.model("entry",entrySchema);

module.exports=entries;