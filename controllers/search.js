"use strict";
var spotify = require('../models/spotifyAuth.js');
var axios = require("axios");


const search = {


  index(request, response) {
    const viewData = {
      title: "Search"
    };
    response.render("search", viewData);
  },


  searchSpotify(req, response) {
   spotify.searchSpotify(req, response).then(
     function(items) {
       
       response.render("./partials/listSpotifySongs",{items})

     }
   )
   
  },

  getUserPlaylists(req, response) {
    spotify.getUserPlaylists(1155871456).then(
      function(myResults){
        response.render("./partials/listplaylists", {myResults});
      }
    )
  }



};

module.exports = search;
