const express = require("express");
const app = express();
const router = require("./routes/index");
const router2 = require("./routes/users");
const router3 = require("./routes/orders");
const router4 = require("./admin/admin");
const ejs = require("ejs");
app.set("view engine","ejs");
app.use("/",router);
app.use("/",router2)
app.use('/',router3);
app.use("/",router4);
const expressHbs = require("express-handlebars");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/products";
app.engine("hbs",expressHbs({extname:"hbs",defaultLayout:"layout",layoutsDir:__dirname + '/views'}))
app.set("view engine","hbs");
mongoose.connect(url,()=>{
    console.log("Connected to the product table")
})
app.use(express.static("./views"))

const port = 3000;
app.listen(port,()=>{
    console.log(`Server is up and running at port ${port}`)
})
