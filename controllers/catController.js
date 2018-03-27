'use strict';

const mongoose = require('mongoose');
const Cat = mongoose.model('Cat');

exports.list_all_cats = function(req, res) {
  /* if query param category
  if (req.query.category) {
    Cat.find({category: req.query.category}, function(err, cats) {
      if (err) res.send(err);
      res.json(cats);
    });
  } else {*/
    Cat.find(function(err, cats) {
      if (err) res.send(err);
      res.json(cats);
    });
  // }
};

exports.post_cat = function(req, res) {
  console.log('adding cat ' + req.body.title);
  console.log(req.file);
  /* const newCat = {
     id: 6,
     title: req.body.title,
     details: req.body.details,
     category: req.body.category,
     coordinates: {
       lat: 60.3196781,
       lng: 24.9079786,
     },
     time: Date.now(),
     thumbnail: 'http://localhost:3000/'+req.file.filename,
     image: 'http://localhost:3000/'+req.file.filename,
     original: 'http://localhost:3000/'+req.file.filename,
   };
*/
  const newCat = new Cat(req.body);
  newCat.save(function(err, cat) {
    if (err) res.send(err);
    res.json(cat);
  });
};


