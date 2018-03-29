'use strict';

const multer = require('multer');
const myStorage = require('../multer/MyStorage.js');

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
};
