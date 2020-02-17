const axios = require("axios");

async function fetchArtists(token) {
  // https://open.spotify.com/playlist/5YKDpSrMoFL0zF8wFMPmKE?si=Ffql32tuS8OYJ2RxacUX8A
  const options = {
    url:
      "https://api.spotify.com/v1/playlists/" +
      "5YKDpSrMoFL0zF8wFMPmKE" +
      "/tracks" +
      "?limit=100",
    headers: { Authorization: "Bearer " + token },
    method: "GET"
  };

  await axios(options)
    .then(function({ data }) {
      var items = data["items"];
      var tracks = [];
      var artists = [];
      items.forEach(song => {
        tracks.push(song["track"]);
      });
      tracks.forEach(track => {
        artists.push(track["artists"]);
      });
      console.log(artists);
      return data["artists"];
    })
    .catch(function(error) {
      console.log("Error " + error.message);
    });
}

module.exports = fetchArtists;
