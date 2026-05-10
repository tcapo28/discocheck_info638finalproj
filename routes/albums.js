const express = require('express');
const router = express.Router();
const Album = require('../models/album');

router.get('/', async (req, res, next) => {
 let albums = await Album.all();
});

router.get('/form', async (req, res, next) => {
  res.render('albums/form', { title: 'ADD A RELEASE' });
});

router.post('/create', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Album.add(req.body);
  res.redirect(303, '/artists/index')
});


module.exports = router;