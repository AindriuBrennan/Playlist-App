"use strict";
var SpotifyWebApi = require('spotify-web-api-node');

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const playlist = require("./controllers/playlist.js");
//route for accounts
const accounts = require("./controllers/accounts.js");

//route for spotify
const spotify =require("./models/spotifyAuth.js")

//dashboard route
router.get("/dashboard", dashboard.index);
//about route
router.get("/about", about.index);
//playlist id route
router.get("/playlist/:id", playlist.index);
//delete song button route
router.get("/playlist/:id/deletesong/:songid", playlist.deleteSong);
//delete a playlist
router.get("/dashboard/deleteplaylist/:id", dashboard.deletePlaylist);

//add a song to playlist
router.post("/playlist/:id/addsong", playlist.addSong);
router.post("/dashboard/addplaylist", dashboard.addPlaylist);


// routes for accounts
router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);

//routes for Spotify

router.get("/spotify",spotify.authorization)

router.get('/callback', function(req, res) {

    /* Read query parameters */
    var code  = req.query.code; // Read the authorization code from the query parameters
    var state = req.query.state; // (Optional) Read the state from the query parameter
  
    /* Get the access token! */
    spotifyApi.authorizationCodeGrant(code)
      .then(function(data) {
        console.log('The token expires in ' + data['expires_in']);
        console.log('The access token is ' + data['access_token']);
        console.log('The refresh token is ' + data['refresh_token']);
  
        /* Ok. We've got the access token!
           Save the access token for this user somewhere so that you can use it again.
           Cookie? Local storage?
        */
  
        /* Redirecting back to the main page! :-) */
        res.redirect('/');
  
      }, function(err) {
        res.status(err.code);
        res.send(err.message);
      }
      )}
);











// var callback = function(req,res) {
//     const  code  = req.query.code;
    
//       spotifyApi.authorizationCodeGrant(code)
//       .then(function(data){
//           console.log(data)
//           spotifyApi.setAccessToken(data.body['access_token']);
//           spotifyApi.setRefreshToken(data.body['refresh_token']);
//       })
//       .catch(function(error){
//         console.log(error)
//       })
// }


// router.get('/callback', callback);
    
    //   const { access_token, refresh_token } = data.body;
    //   spotifyApi.setAccessToken(access_token);
    //   spotifyApi.setRefreshToken(refresh_token);
  
    //   res.redirect('http://localhost:3000/dashboard');
    // // } catch(err) {
    //   res.redirect('/#/error/invalid token');
    // }
  

module.exports = router;
