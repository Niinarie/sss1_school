const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 3000;
const http = require('http');
const https = require('https');
const fs = require('fs');
const passport = require('passport');
const session = require('express-session');
const helmet = require('helmet');

const sslkey = fs.readFileSync('key.pem');
const sslcert = fs.readFileSync('cert.pem');

app.use(cookieParser('secret'));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(helmet());

const options = {
  key: sslkey,
  cert: sslcert,
};

require('./helpers/passport')(passport);

// app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('utils'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(session({
  name: 'session',
  resave: true,
  saveUninitialized: true,
  secret: process.env.SECRET,
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/catRoutes')(app, passport);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.render('error', {message: err.message, user: req.user});
});

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


