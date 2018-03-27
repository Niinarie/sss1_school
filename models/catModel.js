'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CatSchema = new Schema({
  id: Number,
  title: String,
  details: String,
  category: String,
  time: Number,
  coordinates: {
    lat: Number,
    lng: Number,
  },
  thumbnail: String,
  image: String,
  original: String,
}, {collection: 'catdata'});

module.exports = mongoose.model('Cat', CatSchema);
