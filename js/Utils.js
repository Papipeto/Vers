function Utils() {
	var startTime = 0;
	var frameNumber = 0;

	this.computeFPS = function() {
		var stats = document.getElementById("stats");

		(function () {
			frameNumber++;		
			var d = new Date().getTime(),
				currentTime = (d - startTime) / 1000,
				result = Math.floor((frameNumber/currentTime));
			if(currentTime > 1) {
				startTime = new Date().getTime();
				frameNumber = 0;
			}
			stats.innerHTML = result + " fps";
		})();
	};
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function convertDegToRad(degre) {
	return degre * Math.PI / 180;
}

function clearCanvas(oCanvas) {
	oCanvas.context.clearRect(0, 0, oCanvas.width, oCanvas.height);
}