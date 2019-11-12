var SpotifyWebApi = require("spotify-web-api-node");

let results = [];
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

  getUserPlaylists(req, res) {
    spotifyApi.getUserPlaylists(req.body.search).then(
      function(data) {
        console.log("Retrieved playlists", data.body);
        res.redirect("/search");
      },
      function(err) {
        console.log("Something went wrong!", err);
      },
      function(data) {
        results = data.name;
        console.log(results);
      }
    );
  },

  searchSpotify(req, res) {
    spotifyApi.searchTracks(req.body.search).then(
      function(data) {
        // var testPage = data.body.tracks.items;
        //dive deep to find attributes from the items array
        console.log(data.body.tracks.items[0].album.name);
        res.redirect("/search");
      },
      function(err) {
        console.error(err);
      }
    );
  },

  searchAlbums(req, res) {
    spotifyApi
      .getAlbum("5U4W9E5WsYb2jUQWePT8Xm")
      .then(function(data) {
        return data.body.albums.map(function(results) {
          return results.id;
        });
      })
      .then(function(trackIds) {
        return spotifyApi.getTracks(trackIds);
      })
      .then(function(data) {
        console.log(data.body);
      })
      .catch(function(error) {
        console.error(error);
      });
  }
};

module.exports = spotify;
