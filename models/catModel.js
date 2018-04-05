'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
  id: Number,
  title: String,
  details: String,
  breed: String,
  time: Date,
  sex: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
  thumbnail: String,
  image: String,
  original: String,
  user: String,
}, {collection: 'catdata'});

catSchema.index({title: 'text'});

module.exports = mongoose.model('Cat', catSchema);
