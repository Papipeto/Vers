function Game(vers, weapon) {	
	this.vers = vers;
	this.weapon = weapon;
}

Game.prototype.keyDownHandler = function(e) {
	switch(e.keyCode) {
		case 39: 
		vers.move("right");
		break;
		case 37:
		vers.move("left");
		break;
		case 38:
		weapon.upWeapon();
		break;
		case 40:
		weapon.downWeapon();
		break;
		case 13:
		vers.jump();
		break;
	}
};