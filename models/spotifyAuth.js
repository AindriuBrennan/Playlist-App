var SpotifyWebApi = require("spotify-web-api-node");
const axios = require("axios");


let results = [];
let trackId =0;
var scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
    "streaming"
  ],
  redirectUri = "http://localhost:3000/callback",
  clientId = "d038cb0335b64a3d8faa5b8a94a61e27",
  clientSecret = "3af833a2737242e5a782195936472e4c";

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri
});

var spotify = {
  createAuthorizeURL(req, res) {
    var html = spotifyApi.createAuthorizeURL(scopes);
    res.redirect(html);
  },

  callback(req, res) {
    /* Read query parameters */
    var code = req.query.code; // Read the authorization code from the query parameters

    /* Get the access token! */
    spotifyApi.authorizationCodeGrant(code).then(
      function(data) {
        console.log("The token expires in " + data["expires_in"]);
        console.log("The access token is " + data["access_token"]);
        console.log("The refresh token is " + data["refresh_token"]);
        spotifyApi.setAccessToken(data.body["access_token"]);
        spotifyApi.setRefreshToken(data.body["refresh_token"]);
        /* Ok. We've got the access token!
           Save the access token for this user somewhere so that you can use it again.
           Cookie? Local storage?
        */

        /* Redirecting back to the main page! :-) */
        res.redirect("/dashboard");
      },
      function(err) {
        res.status(err.code);
        res.send(err.message);
      }
    );
  },

  getUserPlaylists() {
    return spotifyApi.getUserPlaylists(1155871456).then(
      function(data) {
        const myPlaylists = data.body.items;
        return myPlaylists;
        // console.log("Retrieved playlists", data.body);
        // res.redirect("/search");
      },
      function(err) {
        console.log("Something went wrong!", err);
      }
    );
  },

  
//get user playlists then get the id of the playlists then get the tracks of the playlist
//does not work, get 404 error
  getUserPlaylistId(id) {
    return spotifyApi.getUserPlaylists(1155871456).then(
      function(data) {
        const myPlaylists = data.body.items;
        let playlistId = myPlaylists.map(item => item.id);
        console.log(playlistId);
        
      }
    )
    .then(axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`))
  },


  //trying to get this data with out user input but could not make it work

  // getPlaylistTracks(playlistId) {
  //  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`).then(
  //    function(data) {
  //      const tracks = data.body.items;
  //      return tracks;
  //    }
  //  )
  // },


  // nothing renders. 
  browseCategories() {
    return axios.get('https://api.spotify.com/v1/browse/categories?country=IE&limit=10', {
      headers: {
        Authorization: 'Bearer' + access_token
      }
    }).then(
      function(data) {
        const categories = data.categories.items;
        return categories;
      },
     
      function(err) {
        console.error(err);
      }
    )
  },




  searchSpotify(req, res) {
    return spotifyApi.searchTracks(req.body.search, {limit: 5}).then(
      function(data) {
        //dive deep to find attributes from the items array

        const items = data.body.tracks.items;
        // const songName = items.forEach(item => console.log(item.name));
        // const bandName = items.forEach(item => console.log(item.artists[0].name));
        // res.render("/listsongs.hbs", {items, songName})
        //res.redirect("/search");
        return items;
      },
      function(err) {
        console.error(err);
      }
    );
  },
  

  //SEARCH new releases not used yet

  searchNewReleases() {
    spotifyApi.getNewReleases({ limit: 5, offset: 0, country: "IE" }).then(
      function(data) {
        console.log(data.body);
        done();
      },
      function(err) {
        console.log("Something went wrong!", err);
      }
    );
  }
};

module.exports = spotify;
