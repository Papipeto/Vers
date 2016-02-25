function Weapon(oCanvas) {
	this.context = oCanvas.context;
	this.range = 35;
	this.weaponAngle = 45;
	this.cursorSpeed = 2;
}

Weapon.prototype.draw = function(posX, posY, direction, range) {
	if(range) {
		this.drawRange(posX, posY, direction);
	}
	this.drawPointer(posX, posY, direction);
}

Weapon.prototype.drawRange = function(posX, posY, direction) {
	this.context.beginPath();
    this.context.arc(posX, posY, this.range, 0, 2 * Math.PI, false);
    this.context.stroke();
    this.context.closePath();
}

Weapon.prototype.drawPointer = function(posX, posY, direction) {
	var x, y = 0;
	if (direction == "left") {
		var x = posX - this.range * Math.cos(this.getAngle());
	}
	else {
		var x = posX + this.range * Math.cos(this.getAngle());
	}
	var y = posY - this.range * Math.sin(this.getAngle());

	this.context.beginPath();
	this.context.rect(x, y, 3, 3);
	this.context.fill();
	this.context.closePath();
}

Weapon.prototype.upWeapon = function() {
	if(this.weaponAngle < 90) {
		this.weaponAngle += this.cursorSpeed;
	}
}

Weapon.prototype.downWeapon = function() {
	if(this.weaponAngle > -90) {
		this.weaponAngle -= this.cursorSpeed;
	}
}

Weapon.prototype.getAngle = function() {
	return convertDegToRad(this.weaponAngle);
}