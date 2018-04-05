const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 3000;
const http = require('http');
const https = require('https');
const fs = require('fs');
const passport = require('passport');
const session = require('express-session');

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem');

const options = {
  key: sslkey,
  cert: sslcert,
};

require('./helpers/passport')(passport);

app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  name: 'session',
  resave: true,
  saveUninitialized: true,
  secret: process.env.SECRET,
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/catRoutes')(app, passport);

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/test`).then(() => {
  http.createServer((req, res) => {
    res.writeHead(301, {'Location': 'https://localhost:8080' + req.url});
    res.end();
  }).listen(PORT);
  https.createServer(options, app).listen(8080);
  console.log('Connected successfully, server listening on port ' + PORT);
}, (err) => {
  console.log('Error connecting: ' + err);
});
