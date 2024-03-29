'use strict';
const uuid = require('uuid');

const logger = require('../utils/logger');
const playlistStore = require('../models/playlist-store.js');



const playlist = {
  index(request, response) {
      //get the playlist id
    const playlistId = request.params.id;
      logger.info('Playlist id = ',playlistId);
    const viewData = {
      title: 'Playlist',
      //get specific playlists
      playlist: playlistStore.getPlaylist(playlistId),
    };
    response.render('playlist', viewData);
  },

  deleteSong(request, response){
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug(`Deleting Song ${songId} from Playlist ${playlistId}`);
    playlistStore.removeSong(playlistId,songId);
    response.redirect('/playlist/' + playlistId);
  },


  addSong(request, response){
    const playlistId = request.params.id;
    const playlist = playlistStore.getPlaylist(playlistId);
    const newSong ={
      id:uuid(),
      title:request.body.title,
      artist:request.body.artist,
      duration:Number(request.body.duration),
    };
    playlistStore.addSong(playlistId,newSong);
    response.redirect('/playlist/'+ playlistId);
  },



};



module.exports = playlist;