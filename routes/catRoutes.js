'use strict';

const multer = require('multer');
const myStorage = require('../helpers/MyStorage.js');
const sharp = require('sharp');

module.exports = (app) => {
  const catController = require('../controllers/catController');

  // Multer for image upload
  const storage = myStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
  });
  const upload = multer({storage: storage});

  // Routes
  app.route('/api/cats')
    .get(catController.list_all_cats);

  app.route('/api/upload')
    .post([upload.single('file'), catController.post_cat]);

  app.route('/api/cats/:id')
    .delete(catController.delete_cat);

  app.route('/api/cats/:id')
    .get(catController.get_cat);

  app.route('/api/cats/:id')
    .patch([upload.single('file'), catController.update_cat]);
};

 /*
  app.route('/api/upload')
  .post(upload.single('file'), function(req, res, next) {
    req.body.original = req.file.path;
    return new Promise((resolve, reject) => {
      const thumbName = '250_' + req.file.path;
      sharp('uploads/' + req.file.path)
      .resize(250, 250)
      .toFile('uploads/' + thumbName, (err, info) => {
        if (err) console.log(err);
        info.thumbnail = thumbName;
        resolve(info);
      });
    })
  });*/
