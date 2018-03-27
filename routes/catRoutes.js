'use strict';

const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const MyStorage = require('../multer/MyStorage.js');

module.exports = (app) => {
  const catController = require('../controllers/catController');

  // Multer for image upload
  const storage = MyStorage({
    destination: (req, file, cb) => cb(null, 'uploads')
  });
  const upload = multer({ storage: storage });

  // Routes
  app.route('/api/cats')
    .get(catController.list_all_cats);

  app.route('/api/upload')
    .post([upload.single('file'), catController.post_cat]);
};

/* app.route('/api/upload')
    .post(function(req, res) {
      upload(req, res, function(err) {
        console.log(req.body);
        catController.post_cat(res.req, res);
      })
    }); */
