const db = require('../database')

exports.get = async (albumId, userId) => {
  const result = await db.getPool()
    .query("SELECT * FROM albums_users WHERE album_id = $1 AND user_id = $2", [albumId, userId]);
  return db.camelize(result.rows)[0];
}

exports.upsert = async (albumId, userId, listened) => {
  const existing = await this.get(albumId, userId);
  if (existing) {
    await db.getPool()
      .query("UPDATE albums_users SET listened = $1 WHERE album_id = $2 AND user_id = $3",
        [listened, albumId, userId]);
  } else {
    await db.getPool()
      .query("INSERT INTO albums_users (album_id, user_id, listened) VALUES ($1, $2, $3)",
        [albumId, userId, listened]);
  }
}

