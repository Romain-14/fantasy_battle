
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math
function getRandomInteger(min, max) { // si 0, 40
	return Math.floor(Math.random() * (max - min + 1)) + min; // floor(0.5 * (40 - 0 + 1) ) + 0
}

export { getRandomInteger };