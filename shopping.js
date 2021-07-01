var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config/database.js');
const bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
//connect to databse
mongoose.connect(config.database);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to db");
});

//init app
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

//add middleware for express validator vid 7

//set routes
var pages = require('./routes/pages.js');
var adminpages = require('./routes/adminpages.js');
app.use('/', pages);
app.use('/admin/pages',adminpages);

var port=3000;
app.listen(port, function(){
    console.log("Port is listening");
});
