import dotenv from "dotenv";
dotenv.config(); 
import express from "express";

import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { userModel } from "./db";

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
app.post("/api/v1/content" , (req , res) => {

})
app.get("/api/v1/content" , (req , res) => {

})
app.delete("/api/v1/content", (req,res) =>{
    
})

app.listen(3000);