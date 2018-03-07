var express=require("express");
var app=express();

var bodyParser=require("body-parser");

app.use(express.static("public"));
app.set("view engine","ejs");
var mongoose=require("mongoose");

var options = {
  useMongoClient: true
}

//mongoose.connect("mongodb://localhost:27001/webmuthu",options);

app.get("/", function(req, res){

    res.send("Welcome to my website");
});

app.get("/product/:title", function(req, res){
  //  var category=req.params.category;
    var prodtitle=req.params.title;
    prodtitle=prodtitle.replace(/-/g,' ');
    console.log(prodtitle);
    //res.send("category Title "+category+"--"+title);

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27001/webmuthu";

MongoClient.connect(url, function(err, MongoClient) {
  if (err) throw err;
  /*Return only the documents where the address starts with an "S":*/


  var db = MongoClient.db("webmuthu");
console.log(prodtitle);
  db.collection("product").findOne({"title.product_title":prodtitle}, function(err, result) {
    if (err) throw err;
  //  var title=result.img;
    console.log("Result: "+result);
    db.close();
    res.render("product",{result:result});
  });
});


});



app.get("*", function(req, res){

    res.send("404");
});


//app.listen(process.env.port,process.env.ip);

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  //var addr = app.address();
  //console.log("server listening at", addr.port);
});
