function Shot(weapon, vers, power, field, oCanvas, cursor) {
	this.context = oCanvas.context;
	this.cWidth = oCanvas.width;
	this.cHeight = oCanvas.height;
	this.cursor = cursor;
	this.weapon = weapon;
	this.vers = vers;
	this.power = power;
	this.field = field;
	this.values = {
		x: vers.posX,
		y: vers.posY - 10,
		a: 0,
		b: 0
	};
}

Shot.prototype.draw = function() {
	this.values.a = (this.vers.posY - this.cursor.y) / (this.vers.posX - this.cursor.x);
	this.values.b = this.vers.posY - this.values.a * this.vers.posX;

	if(this.vers.direction == 'left') {
		this.values.x--;
		if(this.values.x < 0) {
		}
	}
	else {
		if(this.values.x > this.cWidth) {
		}
		this.values.x++;
	}

	if(this.values.x < 0 || this.values.x > this.cWidth) {
		this.end();
	}
	
	this.values.y = this.values.a * this.values.x + this.values.b;

	if(this.values.y >= this.field[Math.floor(this.values.x)] && this.values.x % 2 === 0) {
		this.end(true);
	}


	this.context.beginPath();
	this.context.moveTo(this.vers.posX, this.vers.posY);
	this.context.lineTo(this.values.x, this.values.y);
	this.context.stroke();
	this.context.closePath();
};

Shot.prototype.end = function(hit) {
	if(hit) {
		console.log('Vous avez touché le terrain!');
	}
	else {
		console.log('Votre tir s\'est perdu!');
	}
	weapon.endShoot();
};