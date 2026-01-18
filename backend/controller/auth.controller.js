import express from 'express';
import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';
import client from '../lib/redis.js';


const createToken = (userId) => {
    
    // accest token
    const accessToken = jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{
       expiresIn:'15m'
    });
    
    //refresh token
    const refreshToken = jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:'7d'
    });

    return {accessToken,refreshToken};
}

//STORE REFRESH TOKEN TO UPSTASH

const storeRefreshToken = async (userId,refreshToken) => {
    await client.set(
  `refreshToken:${userId}`,
  refreshToken,
  "EX",
  7 * 24 * 60 * 60
);


}

//Save access and refresh token to cookie

const saveTokenCookie = (res,accessToken,refreshToken) => { 
    res.cookie('accessToken',accessToken,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:'strict',
        maxAge:15 * 60 * 1000
    }
    );

    res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:'strict',
        maxAge:7 * 24 * 60 * 60 * 1000
    }
    );

}

//SIGNUP
 
export const signup = async (req, res) => {
    const {name, email, password} = req.body;
    const userExist = await User.findOne({email});

    try {
     if(userExist) {
        return res.status(400).json({
            message: "False ! User already exist"
        })
    }
    //create user TO DB
    const user = await User.create({name,email,password});
    
    //authenticate user 

    const {accessToken,refreshToken} = createToken(user._id);

    //store refresh token in upstash redis 

    await storeRefreshToken(user._id,refreshToken);

    //Save access and refresh token to cookie

    saveTokenCookie(res,accessToken,refreshToken);

    res.status(200).json({message:"Success ",
        user:{
            _id:user._id,
            name:user.name,
            email:user.email
        } });

    } catch (error) {
        console.log("Error in signup controller",error.message);
        return res.status(500).json({message:"Server error"});
    }
}


//LOGIN

export const login = async (req,res ) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});

    try {
        if(!user) {
            return res.status(400).json({message:"User not found"});
        }
        const isMatch = await user.matchPassword(password);

        if(!isMatch) {
            return res.status(400).json({message:"Invalid Password"});
        }

        //create token
        const {accessToken,refreshToken} = createToken(user._id);

        //store refresh token in upstash redis
        await storeRefreshToken(user._id,refreshToken);

        //Save access and refresh token to cookie
        saveTokenCookie(res,accessToken,refreshToken);

        //send response
        res.status(200).json({message:"Success",user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }});

    } catch (error) {
        console.log("Error in login controller",error.message);
        return res.status(500).json({message:"Server error"});
    }
}

//LOGOUT 

export const logout = async (req,res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if(refreshToken){
        //verify refresh token because we need userId to delete refresh token from upstash
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        const userId = decoded.userId;

        //delete refresh token from upstash redis
        await client.del(`refreshToken:${userId}`);

        //delete refresh and accces token from cookie
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');

        //send response
        res.status(200).json({message:"Logout successfully"});
    }
  } catch (error) {
    console.log("Error in logout controller",error.message);
    return res.status(500).json({message:"Server error"});
  }
}

//REFRESH Access Token

export const refreshToken = async (req,res) =>{
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({message:"Unauthorized"});
        }
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        const storedRefreshToken = await client.get(`refreshToken:${decoded.userId}`);
        if(refreshToken !== storedRefreshToken){
            return res.status(401).json({message:"Unauthorized"});
        }
        const accessToken = jwt.sign({userId:decoded.userId},process.env.ACCESS_TOKEN_SECRET, {expiresIn:'15m'});
        res.cookie('accessToken',accessToken,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:'strict',
            maxAge:15 * 60 * 1000   
        })
        res.status(200).json({message:"Successfully refreshed token"});
    } catch (error) {
        console.log("Error in refresh token controller",error.message);
        return res.status(500).json({message:"Server error"});
    }
}

export const getProfile = async (req,res) => {
    try {
        res.json({user: req.user});
    } catch (error) {
        console.log("Error in get profile controller",error.message);
        return res.status(500).json({message:"Server error"});
    }
}


