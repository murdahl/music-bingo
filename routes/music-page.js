var express = require('express');
var router = express.Router();
var fetchArtists = require('../lib/fetchArtists');

router.get('/:bearer', async (req, res, next) => {
	// Get 25 music names and imgurls
	var bearerToken = req.params.bearer;
	if (!bearerToken) {
		res.render('main', { layout: 'index' });
	}
	// Fetch artisttable
	var artists = await fetchArtists.fetchArtists(bearerToken);

	//Scramble 25 tables and return
	var artistTables = fetchArtists.pickNRandomizedList(artists, 25);

	console.log(artistTables);
	res.render('main', { layout: 'index', artistTables, bearerToken });
});

router.post('/', async (req, res, next) => {
	// Get 25 music names and imgurls
	var bearer = req.body.bearer;
	return res.redirect('/bearer/' + bearer);
});

router.post('/', async (req, res, next) => {
	// Get 25 music names and imgurls
	res.render('main', {});
});

module.exports = router;
