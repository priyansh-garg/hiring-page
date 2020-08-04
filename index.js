const express = require('express');

const multer = require('multer');

const path = require('path');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const db= require("./models/entry");

const app=express();
app.use(express.static("public"));


const storage = multer.diskStorage({
    destination:"./public/resume",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
});

const upload =multer({ storage });
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/upload",upload.single("resume"),(req,res)=>{
        

    const filepath=__dirname+"/public/resume/"+req.file.filename;
        const entry= new db({
            name:req.body.name,
            email:req.body.email,
            resume:path.normalize(filepath).replace(/\\/g, '/'),
            resumeLink:req.body.link,
            appliedPosition:req.body.position,
            highestQualification:req.body.qualification
        });

//        console.log(entry);
        entry.save((err,res)=>{
            if(err)
            res.send(err);

        });


        res.send("Resume successfully uploaded");
});

app.listen(3000,()=>{
    console.log("Port started on 3000");
});

