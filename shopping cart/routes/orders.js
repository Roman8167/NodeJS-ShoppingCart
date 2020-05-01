const express = require("express");
const router = express.Router();
router.use(express.urlencoded({extended:false}))
const mongoose = require("mongoose");
const customerOrders = require("../models/customers");
const url = "mongodb://localhost:27017/customers";
mongoose.connect(url,()=>{
    console.log("Connected to the customer tables");
});
////posting the purchase button
router.post("/purchase",function(req,res){
    const errors = [];
    const {name,email,productName,totalPrice,totalQuantity} = req.body;
    if(!name||!email){
        errors.push({msg:"Please fill the form"})
    }
    if(errors.length>0){
        res.render("purchase.hbs",{layout:"purchaseLayout.hbs"}),{
            errors,
            name,
            email,

        }
        
    }
    else{
        const newPurchase = new customerOrders({
            name:req.body.name,
            email:req.body.email,
            productName:req.body.productName,
            totalPrice:req.body.totalPrice,
            totalQuantity:req.body.totalQuantity
        });
        newPurchase.save().then(res.redirect("/thankyou")).catch((err)=>{
            console.log(err)
        });
        
    }

})
router.get('/thankyou',function(req,res){
    res.render("thankyou.hbs",{layout:"thankview.hbs"})
})
module.exports = router