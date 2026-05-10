const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/register', async (req, res, next) => {
  res.render('users/register', { title: 'DiscoCheck || Registration' });
});

router.post('/register', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  const user = await User.getByEmail(req.body.email)
  if (user) {
    res.render('users/register', {
      title: 'DiscoCheck || Login',
    });
  } else {
    User.add(req.body);
    res.redirect(303, '/users/login');
  }
});

router.get('/login', async (req, res, next) => {
  res.render('users/login', { title: 'DiscoCheck || Login' });
});
router.post('/login', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  const user = await User.login(req.body)
  if (user) {
    req.session.currentUser = user
    res.redirect(303, '/');
  } else {
    res.render('users/login', {
      title: 'DiscoCheck || Login',
    });
  }
});

router.post('/logout', async (req, res, next) => {
  delete req.session.currentUser
  res.redirect(303, '/');
});


module.exports = router;
