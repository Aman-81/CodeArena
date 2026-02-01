
// // const jwt = require('jsonwebtoken');
// // const User = require('../models/user');
// // const redisClient = require('../config/redis');

// // const adminMiddleware = async (req, res, next) => {
// //   try {
// //     const { token } = req.cookies || {};
// //     if (!token) throw new Error('Token is not present');

// //     const payload = jwt.verify(token, process.env.JWT_KEY);
// //     const { _id } = payload;
// //     if (!_id) throw new Error('Invalid token');

// //     const user = await User.findById(_id);
// //     if (!user) throw new Error("User doesn't exist");

// //     if(payload.role!='admin') throw new Error('Token nhi hai')

// //     const isBlocked = await redisClient.exists(`token:${token}`);
// //     if (isBlocked) throw new Error('Invalid token');

// //     req.user = user;
// //     next();
// //   } catch (err) {
// //     res.status(401).send("Error: " + err.message);
// //   }
// // };

// // module.exports = adminMiddleware;


// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const redisClient = require('../config/redis');

// const adminMiddleware = async (req, res, next) => {
//   try {
//     const { token } = req.cookies || {};
//     if (!token) throw new Error('Token is not present');

//     // 🔑 Token verify
//     const payload = jwt.verify(token, process.env.JWT_KEY);
//     const { _id, role } = payload;
//     if (!_id) throw new Error('Invalid token payload');

//     // 🔑 User DB check
//     const result = await User.findById(_id);
//     if (!result) throw new Error("User doesn't exist");

//     // 🔑 Role check
//    if (payload.role !== 'admin') throw new Error('Access denied: Admins only');

//     // 🔑 Redis blacklist check
//     const isBlocked = await redisClient.exists(`token:${token}`);
//     if (isBlocked) throw new Error('Invalid/blocked token');

//     req.result = result; // user attach karo

//     next();
//   } catch (err) {
//     res.status(401).send("Error: " + err.message);
//   }
// };

// module.exports = adminMiddleware;




// //ritik ka code





const jwt = require("jsonwebtoken");
const User = require("../models/user");
const redisClient = require("../config/redis");

const adminMiddleware = async (req, res, next) => {
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
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Access denied: Admin only" });
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

module.exports = adminMiddleware;
