const axios = require('axios');

async function fetchArtists(token) {
	// https://open.spotify.com/playlist/5YKDpSrMoFL0zF8wFMPmKE?si=Ffql32tuS8OYJ2RxacUX8A
	const optionsPlaylist = {
		url:
			'https://api.spotify.com/v1/playlists/' +
			'5YKDpSrMoFL0zF8wFMPmKE' +
			'/tracks' +
			'?limit=100',
		headers: { Authorization: 'Bearer ' + token },
		method: 'GET'
	};

	var artistInPlaylist = [];
	var artistIdList = [];
	var returnArtists;
	await axios(optionsPlaylist)
		.then(function({ data }) {
			var items = data['items'];
			var tracks = [];
			items.forEach(song => {
				tracks.push(song['track']);
			});
			tracks.forEach(track => {
				artistInPlaylist.push(track['artists']);
			});
			artistInPlaylist.forEach(artists => {
				artistIdList.push(artists[0]['id']);
			});
		})
		.catch(function(error) {
			console.log('Error ' + error.message);
		});
	var artistIdString = artistIdList.join('%2C');
	const optionsArtists = {
		url: 'https://api.spotify.com/v1/artists?ids=' + artistIdString + '',
		headers: { Authorization: 'Bearer ' + token },
		method: 'GET'
	};

	await axios(optionsArtists)
		.then(function({ data }) {
			var artists = data['artists'];
			returnArtists = artists;
		})
		.catch(function(error) {
			console.log('Error ' + error.message);
		});
	return returnArtists;
}

function pickNRandomizedList(listedArtists, n = 25) {
	var shuffledList = shuffle(listedArtists).slice(0, n);
	var i,
		j,
		artistTables = [],
		chunk = 5;
	for (i = 0, j = shuffledList.length; i < j; i += chunk) {
		artistTables.push(shuffledList.slice(i, i + chunk));
	}
	return artistTables;
}

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

module.exports = { fetchArtists, pickNRandomizedList };
