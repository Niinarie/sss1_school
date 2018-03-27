/* eslint-disable */
const express = require('express'),
app = express(),
multer = require('multer'),
fs = require('fs'),
path = require('path'),
mongoose = require('mongoose'),
Cat = require('./models/catModel'),
PORT = 3000;


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage}); 

app.use(express.static('public'));
app.use(express.static('uploads'));


/* app.post('/cat', upload.single('file'), (req, res) => {
  console.log(req.body.title);
  console.log(req.file.filename);
  fs.readFile('./public/data.json', function (err, data) {
    let json = JSON.parse(data);
    const newCat = {
      id: json[json.length-1].id + 1,
      title: req.body.title,
      details: req.body.details,
      category: req.body.category,
      coordinates: {
        lat: 60.3196781,
        lng: 24.9079786
      },
      time: Date.now(),
      thumbnail: 'http://localhost:3000/'+req.file.filename,
      image: 'http://localhost:3000/'+req.file.filename,
      original: 'http://localhost:3000/'+req.file.filename
    }
    json.push(newCat);    
    fs.writeFile("./public/data.json", JSON.stringify(json), function(err){
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  });
  res.status(200).send({result:'success'});
}); */

var routes = require('./routes/catRoutes'); //importing route
routes(app); //register the route

mongoose.connect('mongodb://localhost:27017/test').then(() => {
  app.listen(PORT);
  console.log('Connected successfully, server listening on port ' + PORT);
}, err => {
  console.log('Error connecting: ' + err);
}); 

