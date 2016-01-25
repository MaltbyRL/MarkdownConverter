'use strict';

var PORT = 4000;

// bring in dependencies / libraries
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var marked = require('marked')
var fs = require('fs');
var app = express();

// configure general middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// route definitions
app.get('/', function(req, res) {
  var html = fs.readFileSync('./index.html').toString();
  res.send(html);
});

app.get('/markdown', function(req, res) {
  console.log('get');
  fs.readFile('./markdown.json', function(err, data) {
    if(err) return res.status(400).send(err);
    var arr = JSON.parse(data);
    res.send(arr);
  });
});

app.post('/markdown', function(req, res) {
  fs.readFile('./markdown.json', function(err, data) {
    if(err) return res.status(400).send(err);
    var arr = JSON.parse(data);
    var name = req.body.name;
    console.log('Name:', name)
    var markedName = marked(name)
    arr.splice(0)
    arr.push(markedName);
    fs.writeFile('./markdown.json', JSON.stringify(arr), function(err) {
      if(err) return res.status(400).send(err);
      res.send();
    });
  });
});



// spin up server
app.listen(PORT, function() {
  console.log('Express server listening on port', PORT)
});

//end
