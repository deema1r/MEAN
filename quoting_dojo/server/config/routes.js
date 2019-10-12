const mongoose = require('mongoose');
const Quote = mongoose.model('Quote');
module.exports = function(app){
    app.get('/', function(req, res) {
        res.render('index');
    })
      
    
    app.post('/quotes', function(req, res) {
      console.log("POST DATA", req.body);
      var quote = new Quote({name: req.body.name, message: req.body.message});
      quote.save(function(err) {
        if(err) {
          console.log('something went wrong');
          console.log(quote.errors);
          res.render('index', {errors: quote.errors})
        } 
        else { 
          console.log('successfully added a quote!');
          res.redirect('/quotes');
        }
      })
    })
    
      app.get('/quotes', function(req, res) {
       arr = Quote.find({}, function(err, quotes) {
         res.render('quotes', {arr:quotes});
       })
     })
} 