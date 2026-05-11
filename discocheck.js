const express = require('express');
const app = express();
const port = 3000;
const csrf = require('csurf')
const bodyParser = require('body-parser');
const { credentials } = require('./config')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const handlebars = require('express-handlebars').create();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const albumsRouter = require('./routes/albums');
const artistsRouter = require('./routes/artists');
const albumsUsersRouter = require('./routes/albums_users');
const path = require('path');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(credentials.cookieSecret));
app.use(expressSession({
  secret: credentials.cookieSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

app.use(csrf({ cookie: true }))
app.use((req, res, next) => {
  res.locals._csrfToken = req.csrfToken()
  next()
});

app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser
  next()
});

app.use((req, res, next) => {
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
});

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/albums_users', albumsUsersRouter);

// custom 404 page
app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Today...');
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
})

// session configuration
//make the current user available in views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser
  next()
})

app.listen(port, () => console.log(
`Express started on http://localhost:${port}; ` +
`press Ctrl-C to terminate.`));
