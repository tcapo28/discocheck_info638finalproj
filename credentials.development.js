module.exports = {
  "cookieSecret": "SecretSecret",
 "postgres": {
   "connectionString": process.env.DBCONNECTIONSTRING || "postgresql://postgres:62584-tcc@localhost:5432/dcdb"
 }
}
