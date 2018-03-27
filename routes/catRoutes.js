'use strict';

const multer = require('multer');
const path = require('path');

module.exports = (app) => {
  const catController = require('../controllers/catController');

  // Multer for image upload
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({storage: storage});

  // Routes
  app.route('/api/cats')
    .get(catController.list_all_cats);

  app.route('/api/upload')
    .post([upload.single('file'), catController.post_cat]);
};
