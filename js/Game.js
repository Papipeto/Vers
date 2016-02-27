function Game(vers, weapon) {	
	this.vers = vers;
	this.weapon = weapon;
}

Game.prototype.keyDownHandler = function(e) {
	switch(e.keyCode) {
		case 39:
		if(!vers.getJumping()) {
			vers.move("right");
		}
		break;
		case 37:
		if(!vers.getJumping()) {
			vers.move("left");
		}
		break;
		case 38:
		if(!vers.getJumping()) {
			weapon.upWeapon();
		}
		break;
		case 40:
		if(!vers.getJumping()) {
			weapon.downWeapon();
		}
		break;
		case 13:
		if(!vers.getJumping()) {
			vers.activateJump();
		}
		break;
		case 32:
		if(!vers.getJumping()) {
			weapon.load();
		}
		break;
	}
};

Game.prototype.keyPressedHandler = function(e) {
	switch(e.keyCode) {
		case 13:
		if(!vers.getJumping()) {
			vers.activateJump();
		}
		break;
	}
};

Game.prototype.keyUpHandler = function(e) {
	switch(e.keyCode) {
		case 32:
		if(weapon.isLoaded()) {
			weapon.shot(vers);
		}
		break;
	}
};