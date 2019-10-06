var express = require("express");

var app = express();
app.use(express.static(__dirname + "/static"));

app.set("views", __dirname + "/views" );
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render("index");
})

var server = app.listen(8000,function(){
    console.log("listening on port 8000");
})

var io = require("socket.io").listen(server);

var old_messages = [];

io.sockets.on('connection', function(socket){


    socket.on("user_login", function (data){
        io.emit("user_joined", data);
        socket.emit("display_old",old_messages);
    })

    socket.on("message_submitted", function(data){
        old_messages.push(data);
        io.emit("display_message", data);
    })

    
})