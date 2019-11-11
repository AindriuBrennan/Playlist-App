var SpotifyWebApi = require("spotify-web-api-node");



var scopes = ["user-read-private", "user-read-email"],
  redirectUri = "http://localhost:3000/callback",
  clientId = "d038cb0335b64a3d8faa5b8a94a61e27",
  clientSecret = "3af833a2737242e5a782195936472e4c";

// state = 'some-state-of-my-choice';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri
});

var code = "";

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
        res.redirect("/");
      },
      function(err) {
        res.status(err.code);
        res.send(err.message);
      }
    );
  }
};

module.exports = spotify;
