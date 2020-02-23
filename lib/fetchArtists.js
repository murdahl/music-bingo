const axios = require('axios');

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
	if (array == null) {
		return [];
	}
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

module.exports = { pickNRandomizedList };
