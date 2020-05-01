const Product = require("../models/Products");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/products";
mongoose.connect(url,()=>{
    console.log("Connected to the product Tables")
})
var product = [new Product({
    imagePath:"https://s2.gaming-cdn.com/images/products/442/271x377/minecraft-cover.jpg",
    productName:"Minecraft P.C Edition",
    description:"Simple Block Game",
    price:15
}),
new Product({
    imagePath:"https://s2.gaming-cdn.com/images/products/595/271x377/assassins-creed-unity-xbox-one-cover.jpg",
    productName:"Assasin's Creed Unity",
    description:"Play as an Assasin",
    price:30
}),
new Product({
    imagePath:"https://s3.gaming-cdn.com/images/products/254/271x377/watch-dogs-cover.jpg",
    productName:"Watch Dogs",
    description:"Play as a hacker",
    price:399
}),
new Product({
    imagePath:"https://s3.gaming-cdn.com/images/products/4211/271x377/grand-theft-auto-v-premium-online-edition-cover.jpg",
    productName:"Gta 5",
    description:"Free-Roam Adventure Game",
    price:15
}),




];
var done = 0;
for(var i=0;i<product.length;i++){
    product[i].save(function(err,result){
        if(err) throw err
        if(done===product.length){
            exit()
        }
    });
}
function exit(){
    mongoose.disconnect()
}
