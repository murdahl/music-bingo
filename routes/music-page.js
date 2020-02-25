var express = require('express');
var router = express.Router();
var spotifyApi = require('../lib/spotify-api');
var fetchArtists = require('../lib/fetchArtists');

router.get('/', async (req, res, next) => {
	// Get 25 music names and imgurls

	// Fetch artisttable
	var artists = await spotifyApi.getSporifyArtistList();

	//Scramble 25 tables and return
	var artistTables = fetchArtists.pickNRandomizedList(artists, 25);

	res.render('main', { layout: 'index', artistTables });
});

router.post('/playlist', async (req, res, next) => {
	// Get 25 music names and imgurls

	var playliststring = req.body.playlist;
	console.log(playliststring);

	// Fetch artisttable
	var artists = await spotifyApi.getSporifyArtistList(playliststring);

	//Scramble 25 tables and return
	var artistTables = fetchArtists.pickNRandomizedList(artists, 25);

	res.render('main', {
		layout: 'index',
		artistTables
	});
});

module.exports = router;
