const express = require("express");
const router= express.Router();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const Customers = require("../models/customers");
router.use(bodyParser.json());
const cookieParser = require("cookie-parser");
const session = require("express-session")
const mongoStore = require("connect-mongo")(session);
const urlencoded = bodyParser.urlencoded({extended:false})
const Product = require("../models/Products");
const mongoose = require("mongoose");
const Cart = require("../models/cart");
router.use(morgan("dev"))
router.use(cookieParser());


router.use(function(req,res,next){
    res.locals.session = req.session;
    next()
})
router.use(session({
    secret:"123456",
    resave:false,
    saveUninitialized:false,
    store:new mongoStore({mongooseConnection:mongoose.connection}),
    cookie:{maxAge:180*60*1000}
}))
///purchase route
router.get("/purchase",function(req,res){
    var cart = new Cart(req.session.cart ? req.session.cart:{})
    res.render("purchase",{layout:"purchaseLayout",items:cart.generateArray(),totalPrice:cart.totalPrice,totalQty:cart.totalQty});
    
});


router.get("/cart",function(req,res,next){
    
    
    Product.find({},function(err,products){
    if(err) throw err;
    
     res.render("main",{layout:"cart",products:products})
    });
    

});
////authentication

router.get("/addcart/:id",function(req,res){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart:{});
    Product.findById(productId,function(err,items){
        if(err){
            return res.redirect("/")
        }
        cart.add(items,items._id);
        req.session.cart = cart;
        res.redirect("/cart");
        console.log(req.session.cart)
    });
    
})
router.get("/shoppingcart",function(req,res){
    
    if(!req.session.cart){
        return res.render("shop",{layout:"view",items:null})
    }
    else{
        var cart = new Cart(req.session.cart);
        return res.render("shop",{layout:"view",items:cart.generateArray(),totalPrice:cart.totalPrice,totalQty:cart.totalQty})
    }
    
})
///deleting the entire cart;
router.get("/delete/:id",function(req,res){
    const productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart:{})
    Product.findById(productId,function(err,delProducts){
        if(err){
            return res.redirect("/")
        }
        else{
            cart.remove(productId);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect("/shoppingcart")
        }
    })
});
///reducing the quantity of the product
router.get('/reduce/:id',function(req,res){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart:{});
    cart.reduce(productId);
    req.session.cart = cart;
    res.redirect("/shoppingcart");
    console.log(req.session.cart)
})


module.exports = router