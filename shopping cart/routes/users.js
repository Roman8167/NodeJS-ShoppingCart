const express = require("express");
const router= express.Router();
router.use(express.urlencoded({extended:false}));
const bcryptjs = require("bcryptjs");
const passport = require("passport");
require("../auth/passport")(passport)
const User = require("../models/users");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/user-login-register";
router.use(passport.initialize())
//connecting mongoose
mongoose.connect(url,()=>{
    console.log(`Connected to the user-login-tables tables`)
});
router.get("/",function(req,res){
    res.render("welcome.ejs")
})
router.get("/login",function(req,res){
    res.render("login.ejs");
    
});
router.get("/register",function(req,res){
    res.render("register.ejs")
});

router.post("/register",function(req,res){
    const errors = [];
    const {name,email,password,password2} = req.body;
    if(!name||!email||!password||!password2){
        errors.push({msg:"Please fill all the forms"})
    }
    if(password!=password2){
        errors.push({msg:"Passwords aren't strong enough"})
    }
    if(password.length<6){
        errors.push({msg:"Passwords should be more than 6 characters"})
    }
    if(errors.length>0){
        res.render("register.ejs",{
            errors,
            name,
            email,
            password,
            password2
        })
    }
    else{
        User.findOne({email:email}).then(user=>{
            if(user){
                errors.push({msg:"Email is already registerd"})
                res.render("register.ejs",{
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            }else{
                const newUser = new User({
                    name:name,
                    email:email,
                    password:password
                });
                const saltRound = 10;
                bcryptjs.genSalt(saltRound,(err,salt)=>{
                    if(err) throw err;
                    bcryptjs.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save().then(res.redirect("/login")).catch((err)=>{
                            console.log(err)
                        })
                    })
                })
            }
        })
    }
});
///login hangle

router.post("/login",function(req,res,next){
    passport.authenticate("local",{
        successRedirect:"/cart",
        failureRedirect:'/login'
    })(req,res,next)
})
module.exports = router