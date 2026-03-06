
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const userMiddleware = (req: Request, res : Response ,next : NextFunction)=>{
    const header = req.headers.authorization;
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
     throw new Error("JWT_SECRET is not defined in .env");
     
    }
   const decoded = jwt.verify(header as string, JWT_SECRET) as jwt.JwtPayload;
  
    if(decoded){
        //@ts-ignore 
        req.userId = decoded.id;
        next()
    }
    else{
        res.status(403).json({
            message : "You are not logged in"
        })
    }
}