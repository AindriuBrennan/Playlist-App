'use strict';

const logger = require('../utils/logger');
const playlistStore = require('../models/playlist-store.js');
const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      //get all the playlists and display them
      title: 'Playlist Dashboard',
      playlists: playlistStore.getAllPlaylists(),
    };
    logger.info('about to render', playlistStore.getAllPlaylists());
    response.render('dashboard', viewData);
  },


  deletePlaylist(request, response){
    const playlistId = request.params.id;
    logger.debug(`Deleting Playlist ${playlistId}`);
    playlistStore.removePlaylist(playlistId);
    response.redirect('/dashboard/');

  },

  addPlaylist(request, response) {
    const newPlaylist = {
      id:uuid(),
      title: request.body.title,
      songs:[],
    };
    playlistStore.addPlaylist(newPlaylist);
    response.redirect('/dashboard');
  },




};

module.exports = dashboard;