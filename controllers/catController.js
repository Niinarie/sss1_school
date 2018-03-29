'use strict';

const mongoose = require('mongoose');
const Cat = mongoose.model('Cat');
const exif = require('../helpers/exif');

exports.list_all_cats = function(req, res) {
  Cat.find(function(err, cats) {
    if (err) res.send(err);
    res.json(cats);
  });
};

exports.post_cat = function(req, res) {
  const exifData = exif.getExif('uploads/'+ req.file.path);
  req.body.thumbnail = '250_' + req.file.path;
  req.body.image = '500_' + req.file.path;
  req.body.original = req.file.path;
  req.body.coordinates = {
    lat: req.body.lat,
    lng: req.body.lng,
  };

  const newCat = new Cat(req.body);
  newCat.save(function(err, cat) {
    if (err) res.send(err);
    console.log(cat);
    res.json(cat);
  });
};


