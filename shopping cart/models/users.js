const mongoose = require("mongoose");
const orderSchema = mongoose.Schema;
const userlogin = new orderSchema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model("user-login-register",userlogin)