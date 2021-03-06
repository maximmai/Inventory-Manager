// Express is part of the MEAN stack.  We also need a couple of middleware packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var json2xls = require('json2xls');

// Mongoose is an ORM for Mongo DB - another element of the MEAN stack
var mongoose = require('mongoose');

var formsAngular = require('forms-angular');   // The server side of forms-angular

// Connect to database - no error handling in this quick example
mongoose.connect('127.0.0.1/fng-quickstart');

// Set up express and middleware
app.use(express.static('app'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

// Initialise forms angular server
var DataFormHandler = new (formsAngular)(app, {urlPrefix: '/api/'});

// Tell forms-angular what models to serve (everything in the models folder in this case)
// This sets up all the /api/ routes
var fs = require('fs');
fs.readdirSync('models').forEach(function (file) {
  if (fs.statSync('models/' + file).isFile()) {
    DataFormHandler.newResource(require('./models/' + file));
    }
});


var Invoice = mongoose.model('Invoice')
var Inventory = mongoose.model('Inventory');

// Anything we haven't already told Express about redirects to index.html and starts Angular
app.get(function(req, res) {
  res.sendfile('./app/index.html');
});



app.use(json2xls.middleware);

app.get('/download',function(req, res) {
	Invoice.find().lean().exec(function (err, invoices) {
    	res.xls('data.xlsx', invoices);
	});
});



// Wait for the user
app.listen(3001, function () {
  console.log('Inventory app listening on port 3001!');
});
