"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const playlist = require("./controllers/playlist.js");
//route for accounts
const accounts = require("./controllers/accounts.js");

//route for spotify auth
const spotify = require("./models/spotifyAuth.js");

//route for spotify queries
const search = require("./controllers/search.js");

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

//routes for spotify queries in search controller
router.get("/search", search.index);
router.post("/search/searchSpotify", search.searchSpotify);
router.post("/search/getUserPlaylists", search.getUserPlaylists);






//routes for Spotify auth
router.get("/spotify", spotify.createAuthorizeURL);
router.get("/callback", spotify.callback);




module.exports = router;
