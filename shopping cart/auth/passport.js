const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/users");
const bcryptjs = require("bcryptjs");
module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField:"email"},(email,password,done)=>{
        User.findOne({email:email}).then(user=>{
            if(!user){
                return done(null,false,{message:"Email is incorrect"})
            }
            else{
                bcryptjs.compare(password,user.password,(err,isMatch)=>{
                    if(isMatch){
                        return done(null,user)
                    }
                    else{
                        return done(null,false,{message:"Password is not correct"})
                    }
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      }); 
}
