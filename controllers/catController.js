'use strict';

const mongoose = require('mongoose');
const Cat = require('../models/catModel');
const fileHelper = require('../helpers/fileHelper.js');

exports.list_all_cats = (req, res) => {
  Cat.find((err, cats) => {
    if (err) res.send(err);
    res.json(cats);
  });
};

exports.post_cat = (req, res) => {
  req.body.thumbnail = '250_' + req.file.path;
  req.body.image = '500_' + req.file.path;
  req.body.original = req.file.path;
  req.body.coordinates = {
    lat: req.body.lat,
    lng: req.body.lng,
  };
  req.body.user = req.user._id;

  const newCat = new Cat(req.body);
  newCat.save((err, cat) => {
    if (err) res.send(err);
    res.json(cat);
  });
};

exports.delete_cat = (req, res) => {
  Cat.findByIdAndRemove({_id: req.params.id}, (err, cat) => {
    if (err) console.log(err);
    console.log(cat);
    fileHelper.deleteFiles([cat.thumbnail, cat.image, cat.original]);
  });
};

exports.get_cat = (req, res) => {
  Cat.findById(req.params.id, (err, cat) => {
    if (err) console.log(err);
    res.json(cat);
  });
};

exports.update_cat = (req, res) => {
  let imageUpdated = false;
  if (req.file) {
    imageUpdated = true;
    req.body.thumbnail = '250_' + req.file.path;
    req.body.image = '500_' + req.file.path;
    req.body.original = req.file.path;
  }
  req.body.coordinates = {
    lat: req.body.lat,
    lng: req.body.lng,
  };
  const id = req.params.id;
  const update = req.body;

  Cat.findOneAndUpdate({_id: id}, update, (err, doc) => {
    if (err) console.log(err);
    if (imageUpdated) {
      fileHelper.deleteFiles([doc.thumbnail, doc.image, doc.original]);
    }
    return res.json('success');
  });
};

exports.find_by_name = (req, res) => {
  Cat.find({title: {$regex: req.query.text, $options: 'i'}}, (err, cat) => {
    if (err) res.send(err);
    return res.json(cat);
  });
};


