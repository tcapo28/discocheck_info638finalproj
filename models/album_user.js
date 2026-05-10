const db = require('../database')

exports.get = (albumId, userEmail) => {
  return albums_users.find((album_user) => {
    return album_user.albumId == albumId && album_user.userEmail == userEmail;
  });
}

exports.add = (album_user) => {
  albums_users.push(album_user);
}

exports.update = (idx, album_user) => {
  books_users[idx] = album_user;
}

exports.upsert = (album_user) => {
  let idx = albums_users.findIndex((au) => {
    return au.albumId == album_user.albumId &&
           au.userEmail == album_user.userEmail;
  });
  if (idx == -1) {
    exports.add(book_user);
  } else {
    exports.update(idx,book_user);
  }
}

