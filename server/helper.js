function randomWithProbability() {
	var notRandomNumbers = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
	var idx = Math.floor(Math.random() * notRandomNumbers.length);
	return notRandomNumbers[idx];
}
