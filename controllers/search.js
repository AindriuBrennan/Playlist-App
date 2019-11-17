"use strict";
var spotify = require("../models/spotifyAuth.js");
const axios = require("axios");

let myPlaylistsId;

const search = {
  index(request, response) {
    const viewData = {
      title: "Search"
    };
    response.render("search", viewData);
  },

  searchSpotify(req, response) {
    spotify.searchSpotify(req, response).then(function(items) {
      response.render("./partials/listSpotifySongs", { items });
    });
  },

  getUserPlaylists(req, response) {
    spotify.getUserPlaylists(1155871456).then(function(myResults) {
      response.render("./partials/listplaylists", { myResults });
      let spotifyPlaylistId = myResults.map(item => item.id);
      
      console.log(spotifyPlaylistId);
      return spotifyPlaylistId;
    });
  },

  // getUserPlaylistId(req, response) {
  //   spotify.getUserPlaylists(1155871456).then(function(myResults) {
  //     const myPlaylists = myResults.body.items;
  //     let playlistId = myPlaylists.map(item => item.id);
  //   })
  //   axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`).then(functon) 
  //     response.render("./partials/listSpotifySongs", {tracks} )
  //   })
  // },

  getPlaylistTracks(req, response) {
    let spotifyPlaylistId = req.params.id;
    spotify.getPlaylistTracks(spotifyPlaylistId).then(function(items) {
      response.render("./partials/listSpotifySongs", { items });
    });
  },

  getCategories(req, response) {
    spotify.browseCategories().then(function(myResults) {
      response.render("./partials/categories",  { myResults });
    });
  }

  
};

module.exports = search;
