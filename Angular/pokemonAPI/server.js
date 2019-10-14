
var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public/dist/public"));

app.listen(1337, function(){
    console.log("Listening on port: 1337");
})