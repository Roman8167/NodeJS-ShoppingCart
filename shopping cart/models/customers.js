const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customerOrders = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    totalQuantity:{
        type:Number,
        required:false
    },
    date:{
        type:Date,
        default:Date.now
    }

    
});
module.exports = mongoose.model("customer-orders",customerOrders)