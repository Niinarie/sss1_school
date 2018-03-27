/* eslint-disable */
const express = require('express'),
app = express(),
mongoose = require('mongoose'),
Cat = require('./models/catModel'),
PORT = 3000;

app.use(express.static('public'));
app.use(express.static('uploads'));

var routes = require('./routes/catRoutes'); //importing route
routes(app); //register the route

mongoose.connect('mongodb://localhost:27017/test').then(() => {
  app.listen(PORT);
  console.log('Connected successfully, server listening on port ' + PORT);
}, err => {
  console.log('Error connecting: ' + err);
}); 

