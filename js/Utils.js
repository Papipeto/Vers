function Utils() {
	this.startTime = 0;
	this.frameNumber = 0;
	this.stats = document.getElementById("stats");
	this.position = document.getElementById("position");
}

Utils.prototype.computeFPS = function() {
	this.frameNumber++;		
	var d = new Date().getTime(),
		currentTime = (d - this.startTime) / 1000,
		result = Math.floor((this.frameNumber/currentTime));
	if(currentTime > 1) {
		this.startTime = new Date().getTime();
		this.frameNumber = 0;
	}
	this.stats.innerHTML = result + " fps";
};

Utils.prototype.displayPosition = function(vers) {
	this.position.innerHTML = "X: " + vers.posX + " - Y:" + vers.posY;
};

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function convertDegToRad(degre) {
	return degre * Math.PI / 180;
}

function clearCanvas(oCanvas) {
	oCanvas.context.clearRect(0, 0, oCanvas.width, oCanvas.height);
}