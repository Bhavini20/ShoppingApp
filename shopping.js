var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shopcart');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to db");
});
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.send('Working');
});

var port=3000;
app.listen(port, function(){
    console.log("Port is listening");
});
