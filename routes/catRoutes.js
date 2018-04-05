'use strict';

const multer = require('multer');
const myStorage = require('../helpers/MyStorage.js');
const sharp = require('sharp');
const catController = require('../controllers/catController');

const storage = myStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
});
const upload = multer({ storage: storage });

const isAuthenticated = (req, res, next) => {
  console.log(req.user);
  if (req.user) return next();
  else {
    return res.status(401).json({
      error: 'User not authenticated',
    });
  }
};

module.exports = (app, passport) => {
  // Routes
  app.route('/api/cats')
    .get(catController.list_all_cats);

  app.route('/api/upload')
    .post(isAuthenticated, [upload.single('file'), catController.post_cat]);

  app.route('/api/cats/:id')
    .delete(catController.delete_cat);

  app.route('/api/cats/:id')
    .get(catController.get_cat);

  app.route('/api/cats/:id')
    .patch([upload.single('file'), catController.update_cat]);

  app.route('/api/find')
    .get(catController.find_by_name);

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: 'index.html',
    failureRedirect: 'login.html',
  }));

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: 'signup.html',
  }));

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/test', (req, res) => {
    if (req.user !== undefined) {
      return res.send(`Hello ${req.user.local.username}!`);
    }
    res.send('Hello Secure World!');
  });
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
