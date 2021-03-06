function Weapon(oCanvas, field) {
	this.field = field;
	this.oCanvas = oCanvas;
	this.context = oCanvas.context;
	this.cWidth = oCanvas.width;
	this.cHeight = oCanvas.height;
	this.range = 35;
	this.weaponAngle = 45;
	this.cursorSpeed = 2;
	this.cursor = {
		x: 0,
		y: 0
	};
	this.cursor.x = 0;
	this.cursor.y = 0;
	this.loaded = false;
	this.power = 0;
	this.powerDisplayWidth = 100;
	this.powerDisplayHeight = 20;
	this.powerSpeed = 2;
	this.shooting = false;
	this.shootX = 0;
	this.shootY = 0;
	this.endPoint = {};
	this.aimBlocked = false;
}

Weapon.prototype.draw = function(posX, posY, direction, range) {
	if(range) {
		this.drawRange(posX, posY);
	}
	this.drawPointer(posX, posY, direction);
};

Weapon.prototype.drawRange = function(posX, posY) {
	this.context.beginPath();
    this.context.arc(posX, posY, this.range, 0, 2 * Math.PI, false);
    this.context.stroke();
    this.context.closePath();
};

Weapon.prototype.drawPointer = function(posX, posY, direction) {
	this.cursor.x = 0;
	this.cursor.y = 0;

	if (direction == "left") {
		this.cursor.x = posX - this.range * Math.cos(this.getAngle());
	}
	else {
		this.cursor.x = posX + this.range * Math.cos(this.getAngle());
	}
	this.cursor.y = posY - this.range * Math.sin(this.getAngle());

	this.context.beginPath();
	this.context.rect(this.cursor.x, this.cursor.y, 3, 3);
	this.context.fill();
	this.context.closePath();
};

Weapon.prototype.upWeapon = function() {
	if(this.weaponAngle < 89) {
		this.weaponAngle += this.cursorSpeed;
	}
};

Weapon.prototype.downWeapon = function() {
	if(this.weaponAngle > -89) {
		this.weaponAngle -= this.cursorSpeed;
	}
};

Weapon.prototype.getAngle = function() {
	return convertDegToRad(this.weaponAngle);
};

Weapon.prototype.load = function() {
	if(this.power < 100) {
		this.power += this.powerSpeed;
		this.loaded = true;
	}
	else {
		this.loaded = false;
		this.shot();
	}
};

Weapon.prototype.isLoaded = function() {
	return this.loaded;
};

Weapon.prototype.activateShot = function(vers) {
	// this.shootDirection = vers.direction;
	this.shot = new Shot(this, vers, this.power, this.field, this.oCanvas, this.cursor);
	this.loaded = false;
	this.power = 0;
	this.shooting = true;
	// this.vPosX = vers.posX;
	// this.vPosY = vers.posY - 10;
	// this.shootX = this.vPosX;
	// this.shootA = (this.vPosY - this.cursor.y) / (this.vPosX - this.cursor.x);
	// this.shootB = this.vPosY - this.shootA * this.vPosX;
};

Weapon.prototype.shoot = function() {
	this.aimBlocked = true;
	this.shot.draw();
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

// Weapon.prototype.drawShot = function() {

// 	if(this.shootDirection == 'left') {
// 		this.shootX--;
// 		if(this.shootX < 0) {
// 		}
// 	}
// 	else {
// 		if(this.shootX > this.cWidth) {
// 		}
// 		this.shootX++;
// 	}

// 	if(this.shootX < 0 || this.shootX > this.cWidth) {
// 		this.endShoot();
// 	}
	
// 	this.shootY = this.shootA * this.shootX + this.shootB;

// 	if(this.shootY >= this.field[Math.floor(this.shootX)] && this.shootX % 2 === 0) {
// 		this.endShoot(true);
// 	}


// 	this.context.beginPath();
// 	this.context.moveTo(this.vPosX, this.vPosY);
// 	this.context.lineTo(this.shootX, this.shootY);
// 	this.context.stroke();
// 	this.context.closePath();
// };

Weapon.prototype.isShooting = function() {
	return this.shooting;
};

Weapon.prototype.endShoot = function(hit) {
	this.shooting = false;
	this.aimBlocked = false;
};