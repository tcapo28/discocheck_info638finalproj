const db = require('../database')

exports.all = async () => {
 const { rows } = await db.getPool().query("select * from albums order by release_date");
 return db.camelize(rows);
}

exports.get = async (id) => {
 const { rows } = await db.getPool().query("select * from albums where id = $1", [id])
 return db.camelize(rows)[0]
}
exports.add = async (album) => {
 await db.getPool().query("insert into albums (artist_id, title, release_date, type, a_stream_link, s_stream_link, album_art) values ($1, $2, $3, $4, $5, $6, $7);",
   [album.artistId, album.title, album.releaseDate, album.type, album.aStreamLink, album.sStreamLink, album.albumArt]);
};

exports.update = async (album) => {
 await db.getPool().query("update albums set artist_id = $1, title = $2, release_date = $3, type = $4, a_stream_link = $5, s_stream_link = $6, album_art = $7 where id = $8;",
   [album.artistId, album.title, album.releaseDate, album.type, album.aStreamLink, album.sStreamLink, album.albumArt, album.id]);
};

exports.upsert = (album) => {
 if (album.id) {
   exports.update(album);
 } else {
   exports.add(album);
 }
};

exports.allForArtist = async (artist) => {
 const { rows } = await db.getPool().query("select * from albums where artist_id = $1 order by release_date", [artist.id]);
 return db.camelize(rows);
}