var SpotifyWebApi = require('spotify-web-api-node');
var clientId = process.env.CLIENTID,
	clientSecret = process.env.CLIENTSECRET;
bingoPlaylist = process.env.BINGOPLAYLIST;

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
	clientId: clientId,
	clientSecret: clientSecret
});

async function getSporifyArtistList() {
	await authSpotify();

	var playlistArtistIds = await getPlaylistInfoFromSpotify();

	if (!playlistArtistIds) {
		return [];
	}

	var artists = await getArtistsFromIds(playlistArtistIds);
	return artists;
}

async function authSpotify() {
	// Retrieve an access token.
	spotifyApi.clientCredentialsGrant().then(
		data => {
			console.log('The access token expires in ' + data.body['expires_in']);
			console.log('The access token is ' + data.body['access_token']);

			// Save the access token so that it's used in future calls
			spotifyApi.setAccessToken(data.body['access_token']);
		},
		err => {
			console.log('Something went wrong when retrieving an access token', err);
		}
	);
}

async function getPlaylistInfoFromSpotify(playListId = bingoPlaylist) {
	var tracks = [];
	var artistInPlaylist = [];
	var artistIds = [];

	await spotifyApi
		.getPlaylistTracks(playListId)
		.then(data => {
			var items = data['body']['items'];
			items.forEach(song => {
				tracks.push(song['track']);
			});
			tracks.forEach(track => {
				artistInPlaylist.push(track['artists']);
			});
			artistInPlaylist.forEach(artists => {
				artistIds.push(artists[0]['id']);
			});
		})
		.catch(err => {
			console.log('Something went wrong when retrieving playlistn', err);
		});
	return artistIds;
}

async function getArtistsFromIds(artistIds) {
	var artists = [];
	await spotifyApi
		.getArtists(artistIds)
		.then(data => {
			artists = data['body']['artists'];
		})
		.catch(err => {
			console.log('Something went wrong fetching Artist info  ' + err.message);
		});
	return artists;
}

module.exports = { getSporifyArtistList };
