import User from "../models/user.model.js";
import asyncHandler from 'express-async-handler';
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
            return res.status(401).json({
                message: "Unauthorized request"
            })
        }
    
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select(
            "-password"
        )
        if(!user){
            return res.status(401).json({
                message: "Invalid token"
            })
        }
        
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: error?.message || "Invalid token"
        })
    }

})

export default verifyJWT;