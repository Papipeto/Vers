function Vers(oCanvas, field, weapon,team) {
	this.context = oCanvas.context;
	this.cWidth = oCanvas.width;
	this.field = field;
	this.vHeight = 15;
	this.vWidth = 5;
	do { //due to the curve clipping, only posX%2==0 is on the curve.
		this.posX = getRandomInt(50, this.cWidth - 50);
	}
	while(this.posX % 2 !== 0);
	this.moveSpeed = 2;
	this.weapon = weapon;
	this.team = team;
	if(this.posX <= this.cWidth / 2) {
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
};

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
};

Vers.prototype.jump = function() {
	if(this.direction == "left") {
		alert("je saute à gauche!");
	}
	else {
		alert("je saute à droite!");
	}
};