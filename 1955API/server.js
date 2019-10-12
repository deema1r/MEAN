var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/1955_api');

var UserSchema = new mongoose.Schema({
    name: {type: String, required: true}
}, {timestamps: true});
mongoose.model('User', UserSchema);
var User = mongoose.model('User');

mongoose.Promise = global.Promise;


app.get('/', function(req, res) {
    User.find({}, function(err, users){
        if(err){
            res.json({message: "error", error: err});
        } else {
            res.json(users);
        }
    });   
});

app.get('/new/:name', function(req, res) {
    var user = new User({name: req.params.name});
    user.save(function(err){
        if(err){
            res.json({message: "error", error: err});
        } else {
            res.redirect('/');
        }
    });
});

app.get('/remove/:name', function(req, res){
    User.findOneAndRemove({name: req.params.name}, function(err){
        if(err){
            console.log('something else went wrong');
            res.json({message: "error", error: err});
        } else{
            console.log('User has been removed');
            res.redirect('/');
        }
    });
    
});

app.get('/:name', function(req, res){
    User.findOne({name: req.params.name}, function(err, data){
        if(err){
            console.log('Even more stuff went wrong');
            res.json({message: "error", error: err});
        } else{
            console.log('User details');
            res.json(data);
        }
    });
});

app.listen(8000, function() {
    console.log("listening on port 8000");
})