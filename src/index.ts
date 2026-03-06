import dotenv from "dotenv";
dotenv.config(); 
import express, { response } from "express";

import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { contentModel, userModel } from "./db";
import { userMiddleware } from "./middleware";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env");
}



const app = express();
app.use(express.json());

app.post("/api/v1/signup" , async (req , res) => {
    const username = req.body.username;
    const password = req.body.password;

    try{

        await userModel.create({
            username : username,
            password : password
        })
        
        res.json({
            message : "User created succesfully"
        })
    }
    catch(e){
        res.status(411).json({
            message : "User already exists"
        })
    }

})
app.post("/api/v1/signin" , async (req , res) => {
    const username = req.body.username;
    const password = req.body.password;

    const response = await userModel.findOne({
        username : username,
        password : password
    })

    if(response){
        const token = jwt.sign({
            id : response._id
        }, JWT_SECRET);
        res.json({
            token
        })
    }
    else{
        res.status(403).json({
            message : "Incorrect credentials"
        })
    }


    
})
app.post("/api/v1/content" ,  userMiddleware, async (req , res) => {

    const link = req.body.link;
    const type = req.body.type;


    await contentModel.create({
            link,
            
            // @ts-ignore
            type,
            // @ts-ignore
            userId: req.userId,
            tags : []
    })

    return res.json({
        message : "Content created"

    })

})
app.get("/api/v1/content" , userMiddleware, async (req , res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await contentModel.find({
        userId : userId
    }).populate("userId", "username");
    res.json({
        content
    })

})
app.delete("/api/v1/content", async (req,res) =>{
    const contentId = req.body.contentId;

    await contentModel.deleteMany({
        contentId ,
        userId : req.userId
    })

    response.json({
        message : "Delted the content"
    })
})

app.post("/api/v1/brain/share", (req,res) =>{

})
app.post("/api/v1/brain/:shareLink", (req,res) =>{

})





app.listen(3000);