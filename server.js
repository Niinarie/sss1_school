const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Cat = require('./models/catModel');
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(bodyParser.json());


const routes = require('./routes/catRoutes');
routes(app);

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/test`).then(() => {
  app.listen(PORT);
  console.log('Connected successfully, server listening on port ' + PORT);
}, (err) => {
  console.log('Error connecting: ' + err);
});
