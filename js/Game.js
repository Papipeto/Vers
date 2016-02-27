function Game(vers, weapon) {	
	this.vers = vers;
	this.weapon = weapon;
}

Game.prototype.keyDownHandler = function(e) {
	if(!vers.getJumping() && !weapon.isShooting()) {
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
				vers.activateJump();
			break;
			case 32:
				weapon.load();
			break;
		}
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
			weapon.activateShot(vers);
		}
		break;
	}
};