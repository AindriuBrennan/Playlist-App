var SpotifyWebApi = require('spotify-web-api-node');


var credentials = {
  clientId:"1936d40efbbf4d329eafa77d1c29e47e",
  clientSecret: "d8b678bf633d42dd8800ee0e3d37c4d9",
  redirectUri: "http://localhost:3000/callback"
}

var scopes = ['user-read-private', 'user-read-email']
//   redirectUri = 'https://localhost:3000/callback',
//   clientId = '1936d40efbbf4d329eafa77d1c29e47e',
//   client_Secret = 'd8b678bf633d42dd8800ee0e3d37c4d9',
//   state = 'some-state-of-my-choice';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi(credentials);

var code = "";

spotifyApi.authorizationCodeGrant(code).then(
  function(data) {
    console.log('The token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    console.log('The refresh token is ' + data.body['refresh_token']);

    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
  
  },
  function(err) {
    console.log('Something went wrong!', err);
  }
);


// // Create the authorization URL
// var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);


//not solution, advice courtesy of austin

// https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
// console.log(authorization.authorizeURL);