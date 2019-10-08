var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/MD_DB', { useNewUrlParser: true });

mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var RabbitSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    age: { type: String, required: true, minlength: 2 }
}, { timestamps: true })
mongoose.model('Rabbit', RabbitSchema);
var Rabbit = mongoose.model('Rabbit');


app.get('/', function (req, res) {
    arr = Rabbit.find({}, function (err, rabbits) {
        res.render('index', { arr: rabbits });
    })
})
app.get('/rabbits/new', function (req, res) {
    res.render('new');
})

app.post('/add', function (req, res) {
    console.log("POST DATA", req.body);
    var rabbit = new Rabbit({ name: req.body.name, age: req.body.age });
    rabbit.save(function (err) {
        if (err) {
            console.log('something went wrong');
            console.log(rabbit.errors);
            res.redirect('/')
        }
        else {
            console.log('successfully added a Rabbit!');
            res.redirect('/');
        }
    })
})

app.get('/rabbits/edit/:id', function (req, res) {
    rabb = Rabbit.findOne({ _id: req.params.id }, function (err, rabbit) {
        console.log(rabbit);
        res.render('edit', { rabb: rabbit });
    })
})
app.post('/change/:id', function (req, res) {
    console.log("POST DATA", req.body);
    Rabbit.update({ _id: req.params.id },
        {
            name: req.body.name,
            age: req.body.age
        },
        function (err) {
            if (err) {
                console.log('something went wrong');
                console.log(rabbit.errors);
                res.redirect(`/meerkats/edit/${req.params.id}`)
            }
            else {
                console.log('successfully changed a Rabbit!');
                res.redirect(`/Rabbits/${req.params.id}`);
            }

        })
})
app.post('/delete/:id', function (req, res) {
    Rabbit.remove({ _id: req.params.id }, function (err) {
        console.log("RECORD DELETED");
        res.redirect('/');
    })
})
app.get('/rabbits/:id', function (req, res) {
    rabb = Rabbit.findOne({ _id: req.params.id }, function (err, rabbit) {
        console.log(rabbit);
        res.render('rabbit', { rabb: rabbit });
    })
});

app.listen(8000, function () {
    console.log("listening on port 8000");
});