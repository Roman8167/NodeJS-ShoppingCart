const express = require("express");
const router = express.Router();
const customerOrders = require("../models/customers");

router.get("/admin",function(req,res){
    customerOrders.find({},function(err,products){
        if(err) throw err;
        res.render("admin.ejs",{products:products})
    })
});
router.get("/admin/:id",function(req,res){
    const productId = req.params.id;
    customerOrders.findByIdAndDelete(productId,function(err,result){
        if(err) throw err;

    }).then(res.redirect("/admin")).catch((err)=>{
        console.log(err)
    })
})

module.exports = router