var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/QD_DB', {useNewUrlParser: true});

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2 },
    message: {type: String, required: true, minlength: 2}
    }, {timestamps: true})
mongoose.model('Quote', QuoteSchema); 
//var Quote = mongoose.model('Quote');   

require('./server/config/routes.js')(app);
// app.get('/', function(req, res) {
//     res.render('index');
// })
  

// app.post('/quotes', function(req, res) {
//   console.log("POST DATA", req.body);
//   var quote = new Quote({name: req.body.name, message: req.body.message});
//   quote.save(function(err) {
//     if(err) {
//       console.log('something went wrong');
//       console.log(quote.errors);
//       res.render('index', {errors: quote.errors})
//     } 
//     else { 
//       console.log('successfully added a quote!');
//       res.redirect('/quotes');
//     }
//   })
// })

//   app.get('/quotes', function(req, res) {
//    arr = Quote.find({}, function(err, quotes) {
//      res.render('quotes', {arr:quotes});
//    })
//  })
  
app.listen(8000, function() {
    console.log("listening on port 8000");
})