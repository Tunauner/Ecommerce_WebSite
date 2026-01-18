import jwt from "jsonwebtoken";
import User from "../models/User.model.js";


export const protectedRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({ message: "Unauthorized-no access token provided" });
        }
        
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.userId).select("-password"); // exclude password
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
     
    } catch (error) {
        console.log("Error in protected route middleware", error.message);
        return res.status(401).json({ message: "Server error" });        
    }
    
}


export const adminRoute = (req, res, next) => {
    try {
        if (req.user && req.user.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized not admin" });
        }
        next();
    } catch (error) {
        console.log("Error in adminRoute controller",error.message);
        return res.status(500).json({message:"Server error"});
    }      
    };