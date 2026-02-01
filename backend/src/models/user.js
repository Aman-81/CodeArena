// const mongoose=require('mongoose');
// const { trim } = require('validator');
// const {Schema}=mongoose;
// const userSchema=new Schema({
//     firstName:{
//         type:String,
//         required:true,
//         minLength:2,
//         maxLength:20
//              },
//     lastName:{
//         type:String,
//         minLength:2,
//         maxLength:20
//     },
//     emailId:{
//         type:String,
//         required:true,
//         trim:true,
//         unique:true,
//         immutable:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     age:{
//         type:Number,
//         min:6,
//         max:80
//     },
//     role:{
//         type:String,
//         enum:['user','admin'],
//         default:'user'
//     },
//     photo:{
//         type:String,
//         default:"This is default photo"
//     }
   

// },{timestamps:true})

// const user=mongoose.model('user',userSchema);
// module.exports=user




const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 20
    },
    emailId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        immutable: true
    },
    // ✅ New field for solved problems
    problemSolved: {
        type: [Schema.Types.ObjectId],
        ref: 'problem',
        default: []
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 6,
        max: 80
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    photo: {
        type: String,
        default: "This is default photo"
    }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
