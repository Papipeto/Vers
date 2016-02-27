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
var weapon =  new Weapon(oCanvas, field);
var vers = new Vers(oCanvas, field, weapon, 2);
var game = new Game(vers, weapon);

document.addEventListener("keydown", game.keyDownHandler, false);
document.addEventListener("keyup", game.keyUpHandler, false);
document.addEventListener("keypressed", game.keyPressedHandler, false);

(function animloop(){
	utils.computeFPS();
	utils.displayPosition(vers);
	clearCanvas(oCanvas);
	board.drawCurve();
	// board.draw();
	vers.draw();
	weapon.drawPower();

	if(weapon.getShooting()) {
		weapon.drawShot();
	}

	if(vers.getJumping()) {
		vers.jump();
	}

	requestAnimationFrame(animloop);
})();