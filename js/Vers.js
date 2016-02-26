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
	this.posY = this.field[this.posX];
	this.moveSpeed = 2;
	this.jumpWidth = 36;
	this.jumping = false;
	this.heightDamage = 80;
	this.tmpPosY = null;
	this.tmpPosX = null;
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
	this.context.rect(this.posX - this.vWidth / 2, this.posY - this.vHeight, this.vWidth, this.vHeight);
	this.context.fillStyle = "#ff0000";
	this.context.fill();
	this.context.closePath();

	this.weapon.draw(this.posX, this.posY - this.vHeight / 1.25, this.direction);
};

Vers.prototype.move = function(direction) {
	switch(direction) {
		case "left":
		if(this.posX > this.vWidth) {
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
	this.posY = this.field[this.posX];
};

Vers.prototype.jump = function() {
	if(this.jumping) {
		if(this.direction == "left") {
			if(this.posX > this.vWidth) {
				this.relX--;
			}
		}
		else {
			if(this.posX < this.cWidth - this.vWidth / 2) {
				this.relX++;
			}
		}

		this.posX = this.tmpPosX;
		this.posY = this.tmpPosY;
		this.posY = this.tmpPosY - (-(0.02 * Math.pow(this.relX, 2)) + 25);

		if(this.direction == "left" && this.posX > this.vWidth / 2) {
			this.posX = this.posX + this.relX - this.jumpWidth;
		}
		else if (this.posX < this.cWidth - this.vWidth / 2){
			this.posX = this.posX + this.relX + this.jumpWidth;
		}

		if(this.posY > this.field[this.posX]) {
			if(this.posY - this.tmpPosY > this.heightDamage) {
				console.log('Ouch!');
				//TODO: implement dmgs
			}
			this.posY = this.field[this.posX];
			this.jumping = false;
		}
	}
};

Vers.prototype.getJumping = function() {
	return this.jumping;
};

Vers.prototype.activateJump = function() {
	this.tmpPosX = this.posX;
	this.tmpPosY = this.posY;
	this.relY = 0;
	this.jumping = true;

	if(this.direction == "left") {
		this.relX = this.jumpWidth;
	}
	else {
		this.relX = -this.jumpWidth;
	}
};