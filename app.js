var express = require('express');
var path = require('path');
var todoController = require('./controllers/todocontroller');

var app = express();

// set up template engine
app.set('view engine','ejs');

// static file
app.use('/assets', express.static('./public/assets'));

// fire controllers
todoController(app);

app.listen(3000);
console.log("listening to port 3000.....");

