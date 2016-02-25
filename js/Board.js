function Board(oCanvas) {
	this.width = oCanvas.width;
	this.height = oCanvas.height;
	this.context = oCanvas.context;
	this.field = [];
	this.minHeight = Math.round(this.height/5);
	this.maxHeight = Math.round(this.height/1.25);
	this.step = 30;
	this.range = 100;
	this.tension = 0;
	this.isClosed = false;
	this.numOfSegments = 30;
};

Board.prototype.generate = function() {
	this.field[0] = getRandomInt(this.minHeight, this.maxHeight);

	for (var i = 1; i <= this.width / this.step; i++) {
		var randHeight = getRandomInt(this.field[i - 1] - this.range, this.field[i - 1] + this.range);

		if (randHeight < this.minHeight) {
			randHeight += this.field[i - 1] - randHeight;
		}
		else if (randHeight > this.maxHeight) {
			randHeight -= randHeight - this.field[i - 1];
		}
		this.field[i] = randHeight;
	}
	return this.getCurvePoints(this.field);
};

Board.prototype.draw = function() {
	this.context.beginPath();
	this.context.moveTo(0, this.field[0]);

	for (var i = 0; i <= this.width / this.step; i++) {
		this.context.lineTo(i * this.step, this.field[i]);
	}
	this.context.strokeStyle = "#0095DD";
	this.context.stroke();
	this.context.closePath();
};

Board.prototype.fillField = function(field) {
	var tmpMinus1 = 0;
	var tmpPlus1 = 0;
	var diffBetweenSteps = 0;
	var filledField = [];

	for(var i = 0; i <= this.width / this.step; i++) {
		var tmpMinus1 = this.field[i];
		filledField[i*30] = tmpMinus1;

		if (i * 30 < this.width) {
			var tmpPlus1 = this.field[i + 1];
			diffBetweenSteps = tmpPlus1 - tmpMinus1;

			for(var j = 0; j < this.step; j++) {
				filledField.push(Math.round(1000 * (tmpMinus1 + (diffBetweenSteps / this.step) * j)) / 1000);
			}
		}
	}

	return filledField;
};

Board.prototype.drawCurve = function(showPoints) {

	this.context.beginPath();

	this.drawLines(this.getCurvePoints(this.field));

	showPoints = false;

	if (showPoints) {
		for(var i = 1;i<=this.field.length;i++) {
			this.context.rect(i * this.step, this.field[i] - 2, 4, 4);
		this.context.fillText(i * this.step, i * this.step, this.field[i]);
		}
	}

	this.context.stroke();
}

Board.prototype.getCurvePoints = function(field) {
	var _field = [], res = [],
	x, y,
	t1x, t2x, t1y, t2y,
	c1, c2, c3, c4,
	st, t, i;

	_field = field.slice(0);
	if (this.isClosed) {
		_field.unshift(field[field.length - 1]);
		_field.unshift(field[field.length - 2]);
		_field.unshift(field[field.length - 1]);
		_field.unshift(field[field.length - 2]);
		_field.push(field[0]);
		_field.push(field[1]);
	}
	else {
		_field.unshift(field[1]);
		_field.unshift(field[0]);
		_field.push(field[field.length - 2]);
		_field.push(field[field.length - 1]);
	}

	for (i=2; i < (_field.length - 4); i+=2) {
		for (t=0; t <= this.numOfSegments; t++) {

			t1x = (_field[i+2] - _field[i-2]) * this.tension;
			t2x = (_field[i+4] - _field[i]) * this.tension;

			t1y = (_field[i+3] - _field[i-1]) * this.tension;
			t2y = (_field[i+5] - _field[i+1]) * this.tension;

			st = t / this.numOfSegments;

			c1 =   2 * Math.pow(st, 3) 	- 3 * Math.pow(st, 2) + 1; 
			c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2); 
			c3 = 	   Math.pow(st, 3)	- 2 * Math.pow(st, 2) + st; 
			c4 = 	   Math.pow(st, 3)	- 	  Math.pow(st, 2);

			x = c1 * _field[i]	+ c2 * _field[i+2] + c3 * t1x + c4 * t2x;
			y = c1 * _field[i+1]	+ c2 * _field[i+3] + c3 * t1y + c4 * t2y;

			res.push(x);
			res.push(y);
		}
	}
	return res;
}

Board.prototype.drawLines = function(field) {
	this.context.moveTo(0, field[0]);
	for(i = 0; i < field.length; i += 2) {
		this.context.lineTo(i, field[i]);
		if (i% this.step == 0) {
			this.context.fillText(i, i, field[i]);
		}
	};
}