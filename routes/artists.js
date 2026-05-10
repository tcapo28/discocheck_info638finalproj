const express = require('express');
const router = express.Router();
const Artist = require('../models/artist');
const Album = require('../models/album');
const AlbumUser = require('../models/album_user');

router.get('/', async (req, res, next) => {
 let artists = await Artist.all();
 res.render('artists/index', { title: 'DiscoCheck || Artists', artists: artists });
});

router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'DiscoCheck',
    artist: await Artist.get(req.params.id),
    artistId: req.params.id,
  }
  templateVars.artist.albums = await Album.allForArtist(templateVars.artist);
  res.render('artists/show', templateVars);
});
module.exports = router;
