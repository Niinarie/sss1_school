'use strict';

const multer = require('multer');
const myStorage = require('../helpers/MyStorage.js');
const sharp = require('sharp');
const catController = require('../controllers/catController');
const Cat = require('../models/catModel');

const storage = myStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
});
const upload = multer({ storage: storage });

const isAuthenticated = (req, res, next) => {
  console.log(req.user);
  if (req.user) return next();
  else {
    return next({message: 'Not authenticated'});
  }
};

module.exports = (app, passport) => {
  // pages
  app.get('/', (req, res, next) => {
    if (req.user) {
      Cat.find({user: req.user._id}, (err, cats) => {
        if (err) return next({message: err});
        res.render('index', {cats: cats, user: req.user});
      });
    } else {
      return next({message: 'Log in to see your cats'});
    }
  });

  app.get('/add', (req, res) => {
    res.render('add', {user: req.user, expressFlash: req.flash('success')});
  });

  app.get('/login', (req, res) => {
    res.render('login', { user: req.user });
  });

  app.get('/signup', (req, res) => {
    res.render('signup', { user: req.user });
  });

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
    successRedirect: '/',
    failureRedirect: '/login',
  }));

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
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
