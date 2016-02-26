function Weapon(oCanvas) {
	this.context = oCanvas.context;
	this.cWidth = oCanvas.width;
	this.cHeight = oCanvas.height;
	this.range = 35;
	this.weaponAngle = 45;
	this.cursorSpeed = 2;
	this.loaded = false;
	this.power = 0;
	this.powerDisplayWidth = 100;
	this.powerDisplayHeight = 20;
	this.powerSpeed = 2;
}

Weapon.prototype.draw = function(posX, posY, direction, range) {
	if(range) {
		this.drawRange(posX, posY, direction);
	}
	this.drawPointer(posX, posY, direction);
};

Weapon.prototype.drawRange = function(posX, posY, direction) {
	this.context.beginPath();
    this.context.arc(posX, posY, this.range, 0, 2 * Math.PI, false);
    this.context.stroke();
    this.context.closePath();
};

Weapon.prototype.drawPointer = function(posX, posY, direction) {
	var x, y = 0;
	if (direction == "left") {
		x = posX - this.range * Math.cos(this.getAngle());
	}
	else {
		x = posX + this.range * Math.cos(this.getAngle());
	}
	y = posY - this.range * Math.sin(this.getAngle());

	this.context.beginPath();
	this.context.rect(x, y, 3, 3);
	this.context.fill();
	this.context.closePath();
};

Weapon.prototype.upWeapon = function() {
	if(this.weaponAngle < 90) {
		this.weaponAngle += this.cursorSpeed;
	}
};

Weapon.prototype.downWeapon = function() {
	if(this.weaponAngle > -90) {
		this.weaponAngle -= this.cursorSpeed;
	}
};

Weapon.prototype.getAngle = function() {
	return convertDegToRad(this.weaponAngle);
};

Weapon.prototype.load = function() {
	if(this.power < 100) {
		this.power += this.powerSpeed;
	}
	this.loaded = true;
};

Weapon.prototype.isLoaded = function() {
	return this.loaded;
};

Weapon.prototype.shot = function() {
	alert('BOOM ' + this.power);
	this.loaded = false;
	this.power = 0;
};

Weapon.prototype.drawPower = function() {
	this.context.beginPath();
	this.context.rect(this.powerDisplayHeight + 1, this.cHeight - this.powerDisplayHeight * 2, this.power, this.powerDisplayHeight);
	this.context.fillStyle = "#ff5555";
	this.context.fill();
	this.context.closePath();

	this.context.beginPath();
	this.context.rect(this.powerDisplayHeight, this.cHeight - this.powerDisplayHeight * 2, this.powerDisplayWidth, this.powerDisplayHeight);
	this.context.strokeStyle = "#000000";
	this.context.stroke();
	this.context.closePath();
};