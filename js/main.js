var utils = new Utils();

var canvas = document.getElementById("gameBoard");
var context = canvas.getContext("2d");
var oCanvas = {
	width: canvas.width,
	height: canvas.height,
	context: context
};

var board = new Board(oCanvas);
var field = board.generate();
var weapon =  new Weapon(oCanvas);
var vers = new Vers(oCanvas, field, weapon, 2);
var game = new Game(vers, weapon);

document.addEventListener("keydown", game.keyDownHandler, false);

(function animloop(){
	utils.computeFPS();
	clearCanvas(oCanvas);
	board.drawCurve();
	vers.draw();

	requestAnimationFrame(animloop);
})();