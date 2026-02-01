// // const jwt=require('jsonwebtoken')

// // const userMiddleware=async(req,resizeBy,next)=>{
// //     try{
// //         const{token}=req.cookies;
// //         if(!token) throw new Error('Token is not present');
// //         const payload = jwt.verify(token,process.env.)
// //         const{_id}=payload;
// //         if(!_id)throw new Error('Invalid token');
// //         const result=await User.findById(_id);
// //         if(!result) throw new Error("User Doesn't Exist");
// //         const isBlocked=await redisClient.exists(`token:${token}`);
// //         if(isBlocked) throw new Error('Invalid token');
// //         req.result=result;
// //         next();

// //     }
// //     catch(err){
// //         res.send("Error"+err.message)
// //     }
// // }

// // const jwt = require('jsonwebtoken');
// // const User = require('../models/user');
// // const redisClient = require('../config/redis');

// // const userMiddleware = async (req, res, next) => {
// //   try {
// //     const { token } = req.cookies;
// //     if (!token) throw new Error('Token is not present');

// //     const payload = jwt.verify(token, process.env.JWT_KEY);
// //     const { _id } = payload;
// //     if (!_id) throw new Error('Invalid token');

// //     const user = await User.findById(_id);
// //     if (!user) throw new Error("User doesn't exist");

// //     const isBlocked = await redisClient.exists(`token:${token}`);
// //     if (isBlocked) throw new Error('Invalid token');

// //     req.user = user;
// //     next();
// //   } catch (err) {
// //     res.status(401).send("Error: " + err.message);
// //   }
// // };

// // module.exports = userMiddleware;

// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const redisClient = require('../config/redis');

// const userMiddleware = async (req, res, next) => {
//   try {
    
//     const { token } = req.cookies || {};
//     if (!token) throw new Error('Token is not present');

//     const payload = jwt.verify(token, process.env.JWT_KEY);
//     const { _id } = payload;
//     if (!_id) throw new Error('Invalid token');

//     const result = await User.findById(_id);
//     if (!result) throw new Error("User doesn't exist");

//     const isBlocked = await redisClient.exists(`token:${token}`);
//     if (isBlocked) throw new Error('Invalid token');

//     // req.result = result;
//     req.user = result;  //ritik ne change kiya
//     next();
//   } catch (err) {
//     res.status(401).send("Error: " + err.message);
//   }
// };

// module.exports = userMiddleware;
    




//ritik ka code



const jwt = require("jsonwebtoken");
const User = require("../models/user");
const redisClient = require("../config/redis");

const userMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies || {};
    if (!token) {
      return res.status(401).json({ error: "No token, authentication failed" });
    }

    const payload = jwt.verify(token, process.env.JWT_KEY);
    const { _id } = payload;
    if (!_id) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // check token blacklist
    const isBlocked = await redisClient.exists(`token:${token}`);
    if (isBlocked) {
      return res.status(401).json({ error: "Invalid/blocked token" });
    }

    req.user = user; // ✅ attach full user
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: " + error.message });
  }
};

module.exports = userMiddleware;
