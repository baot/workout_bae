const express = require('express');
const http = require('http');

const webpackDevServer = require('./src/webpackDevServer');

const app = express();
const server = http.createServer(app);

//const cookieParser = require('cookie-parser');
//const session = require('express-session');

//app.use(cookieParser());
//app.use(session({ secret: 'ky19uz7wg_q3ELjx_TS8j82nn7YwKIA2AvWbh1SN2pSiz5ABK_ru01R14OC1-kRP', resave: false,  saveUninitialized: false }));
//app.use(passport.initialize());
//app.use(passport.session());

app.get('/api/test', function(req, res){
  res.send('Hello World!');
});

// Auth0 callback handler
//app.get('/callback',
//  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
//  function(req, res) {
//    if (!req.user) {
//      throw new Error('user null');
//    }
//    res.redirect("/user");
//  });

//app.get('/user', function (req, res) {
//  res.render('user', {
 //   user: req.user
//  });
//});

webpackDevServer();
server.listen(3000, 'localhost', function(err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('API server listening at http://localhost:3000');
});
