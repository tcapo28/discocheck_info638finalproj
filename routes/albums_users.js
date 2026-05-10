const express = require('express');
const router = express.Router();
const AlbumUser = require('../models/album_user');

router.post('/upsert', async (req, res, next) => {
  const { album_id, user_id, listened } = req.body;
  await AlbumUser.upsert(album_id, user_id, listened === 'true');
  res.redirect(303, `/artists/show/${req.body.artist_id}`);
});

module.exports = router;