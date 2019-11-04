"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const playlist = require('./controllers/playlist.js');


router.get("/", dashboard.index);
//dashboard route
router.get("/dashboard", dashboard.index);
//about route
router.get("/about", about.index);
//playlist id route
router.get('/playlist/:id',playlist.index);
//delete song button route
router.get('/playlist/:id/deletesong/:songid',playlist.deleteSong);
//delete a playlist
router.get('/dashboard/deleteplaylist/:id',dashboard.deletePlaylist);



//add a song to playlist
router.post('/playlist/:id/addsong', playlist.addSong);
router.post('/dashboard/addplaylist', dashboard.addPlaylist);


module.exports = router;
