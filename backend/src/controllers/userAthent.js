const redisClient = require('../config/redis');

const User = require('../models/user');
const validate = require('../utils/validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Submission=require('../models/submission')


const register = async (req, res) => {
  try {
    validate(req.body);

    const { firstName,  emailId, password } = req.body;

    //console.log("Password received:", password); // Debug log

    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
     req.body.role='user'

    const user = await User.create(req.body);

    const reply={
      firstName:user.firstName,
      emailId:user.emailId,
      _id:user._id
    }

    const token = jwt.sign(
      { _id: user._id, emailId: user.emailId,role:'user' },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 }
    );

    res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
     res.status(201).json({
      user:reply,
      message:"Register Successfully"
    });

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};


const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) throw new Error("Invalid Credentials");

    const user = await User.findOne({ emailId });
    if (!user) throw new Error("Invalid Credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid Credentials");


    const reply={
      firstName:user.firstName,
      emailId:user.emailId,
      _id:user._id
    }
    // Include role from DB
    const token = jwt.sign(
      { _id: user._id, emailId: user.emailId, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 }
    );

     
   // console.log("Decoded Token for debug:", jwt.verify(token, process.env.JWT_KEY)); // Debug line

    res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
    res.status(201).json({
      user:reply,
      message:"Login Successfully"
    });
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
};


// const logout = async (req, res) => {
//   try{
//          const {token}=req.cookie;
//          const payload = jwt.decode(token)
//          await redisClient.set(`token${token}`,"Blocked");
//          await redisClient.expireAt(`token:${token}`,payload.exp)
//          res.cookie("token",null,{expireAt:new Date(Date.now())});
//           res.send("Logged Out SuccessFully")
//  }
//   catch(err){
//     res.status(503).send(err.message);
//   }
// };

const logout = async (req, res) => {
  try {
    const { token } = req.cookies || {};
    if (!token) return res.status(400).send("No token found");

    const payload = jwt.decode(token);
    if (!payload || !payload.exp) return res.status(400).send("Invalid token");

    // Block the token in Redis until it expires
    await redisClient.set(`token:${token}`, "Blocked");
    await redisClient.expireAt(`token:${token}`, payload.exp);

    // Clear cookie
    res.cookie("token",null, { expires: new Date(0) });

    res.status(200).send("Logged Out Successfully ✅");
  } catch (err) {
    res.status(503).send("Error: " + err.message);
  }
}; 

const adminRegister= async (req, res) => {
  try {
    validate(req.body);

    const { firstName, lastName, emailId, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
     req.body.role = 'admin';   // DB mein admin role save karo

    const newUser = await User.create(req.body);

    const token = jwt.sign(
  { _id: newUser._id, emailId: newUser.emailId, role: newUser.role },
  process.env.JWT_KEY,
  { expiresIn: 60 * 60 }
);


    res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
    res.status(201).send("Admin Created Successfully ✅");

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};


const deleteProfile=async(req,res)=>{
  try{
    const userId=req.user._id;
    await User.findByIdAndDelete(userId);
    await Submission.deleteMany({userId});
    res.status(200).send("Deleted Successfully")
  }
  catch(err){
   res.status(500).send("Internal Server Error")
  }
}
module.exports = { register, login, logout,adminRegister,deleteProfile };
