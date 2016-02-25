function Vers(oCanvas, field, weapon,team) {
	this.context = oCanvas.context;
	this.cWidth = oCanvas.width;
	this.field = field;
	this.vHeight = 15;
	this.vWidth = 5;
	this.posX = 50;
	this.moveSpeed = 2;
	this.weapon = weapon;
	if(team = 1) {
		this.direction = "right";
	}
	else {
		this.direction = "left";
	}
}

Vers.prototype.draw = function(oCanvas) {
	this.context.beginPath();
	this.context.rect(this.posX - this.vWidth / 2, this.field[this.posX] - this.vHeight, this.vWidth, this.vHeight);
	this.context.fillStyle = "#ff0000";
	this.context.fill();
	this.context.closePath();

	this.weapon.draw(this.posX, this.field[this.posX] - this.vHeight / 1.25, this.direction);
}

Vers.prototype.move = function(direction) {
	switch(direction) {
		case "left":
		if(this.posX > 0 + this.vWidth) {
			this.posX -= this.moveSpeed;
		}
		this.direction = "left";
		break;
		case "right":
		if(this.posX < this.cWidth - this.vWidth) {
			this.posX += this.moveSpeed;
		}
		this.direction = "right";
		break;
	}
}

Vers.prototype.jump = function() {
	if(this.direction == "left") {
		alert("je saute à gauche!");
	}
	else {
		alert("je saute à droite!");
	}
}