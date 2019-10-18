// var express = require("express");
// var app = express();
// var bodyParser = require("body-parser");
// var mongoose = require("mongoose");

// app.use(express.static( __dirname + '/public/dist/public' ));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// mongoose.connect("mongodb://localhost/restful_task_API");
// require("./server/config/mongoose.js");

// require("./server/config/routes.js")(app);

// app.listen(8000, function(){
//     console.log("Listening on port: 8000");
// })

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var mongoose = require("mongoose");
app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname + '/public/dist/public')));
// const db = 'mongodb://localhost/restful_task_api';
// require('./server/config/mongoose.js')(db);
mongoose.connect("mongodb://localhost/restful_task_API");
require("./server/config/mongoose.js");
require('./server/config/routes.js')(app);
app.listen(8000, function() {
console.log('Listening on port 8000');
});


// var models = require('./server/models/task.js')
// var db_connect = require('./server/config/mongoose.js')
