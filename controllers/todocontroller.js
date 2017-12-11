var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to mongodb
mongoose.connect('mongodb://test:test@ds129966.mlab.com:29966/nodetodotest');

// create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

// create a model for db
var Todo = mongoose.model('todos', todoSchema);
var itemOne = Todo({item:'buy flowers'}).save(function(err){
    if(err)throw err;
    console.log('item saved');
});

var data = [{item:'get milk'},{item: 'walk dog'},{item:'write some coding'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo',function(req,res){
res.render('todo',{todos:data});
});

app.post('/todo',urlencodedParser,function(req,res){
data.push(req.body);
res.json(data);
});

app.delete('/todo/:item',function(req,res){
    data = data.filter(function(todo){
        return todo.item.replace(/ /g,'-') !== req.params.item
    });
res.json(data);
});
};